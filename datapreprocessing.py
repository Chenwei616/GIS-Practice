# code: utf-8

from importlib import reload
import re
import json
import xlrd
import os
import sys


reload(sys)
# sys.setdefaultencoding('utf-8')
print(sys.getdefaultencoding())


class LPEntity:
    def __init__(self, type, attrinfo, shapelist):
        self.Type = type
        self.AttrInfo = attrinfo
        self.ShapeList = shapelist

    @staticmethod
    def to_serializable(obj):
        if isinstance(obj, ObjZhuang):
            return {'Name': obj.Name, 'ID': obj.ID}
        elif isinstance(obj, ObjCeng):
            return {'ID': obj.ID, 'ZID': obj.ZID}
        elif isinstance(obj, ObjHu):
            return {'ID': obj.ID, 'CID': obj.CID, 'ZID': obj.ZID, 'Function': obj.Function, 'Profession': obj.Profession, 'Multimedia': obj.Multimedia, 'Description': obj.Description}
        elif isinstance(obj, coord_obj):
            return {'flag': obj.flag, 'floor': obj.floor, 'height': obj.height, 'coords': obj.coords}
        elif isinstance(obj, LPEntity):
            return {'type': obj.Type, 'attrInfo': obj.AttrInfo, 'shapeList': obj.ShapeList}
        else:
            # return ''
            # return str(obj)
            raise TypeError('%r is not JSON serializable' % obj)


class ObjZhuang:
    def __init__(self, name, id):
        #
        self.Name = name
        #
        self.ID = id

    def to_serializable(obj):
        if isinstance(obj, ObjZhuang):
            return {'Name': obj.Name, 'ID': obj.ID}
        else:
            # return ''
            # return str(obj)
            raise TypeError('%r is not JSON serializable' % obj)


class ObjCeng:
    def __init__(self, id, zid):
        #
        self.ID = id
        #
        self.ZID = zid

    def to_serializable(obj):
        if isinstance(obj, ObjCeng):
            return {'ID': obj.ID, 'ZID': obj.ZID}
        else:
            # return ''
            # return str(obj)
            raise TypeError('%r is not JSON serializable' % obj)


class ObjHu:
    def __init__(self, id, cid, zid, function, profession, multimedia, description):
        #
        self.ID = id
        #
        self.CID = cid
        #
        self.ZID = zid
        #
        self.Function = function
        #
        self.Profession = profession
        #
        self.Multimedia = multimedia
        #
        self.Description = description

    def to_serializable(obj):
        if isinstance(obj, ObjHu):
            return {'ID': obj.ID, 'CID': obj.CID, 'ZID': obj.ZID, 'Function': obj.Function, 'Profession': obj.Profession, 'Multimedia': obj.Multimedia, 'Description': obj.Description}
        else:
            # return ''
            # return str(obj)
            raise TypeError('%r is not JSON serializable' % obj)


class coord_obj:
    def __init__(self, flag, height, floor, coords):
        self.flag = flag
        self.height = height
        self.floor = floor  # '{"coordid":"' + str(coordid) + '",'
        self.coords = coords  # '"coords":' + coords + '}'

    def to_serializable(obj):
        if isinstance(obj, coord_obj):
            return {'flag': obj.flag, 'height': obj.height, 'floor': obj.floor, 'coords': obj.coords}
        else:
            # return ''
            # return str(obj)
            raise TypeError('%r is not JSON serializable' % obj)


class DealExcel:
    def __init__(self, path):
        self.path = path

    def extract_attr_info(self):
        dict = {}
        xlsfile = xlrd.open_workbook(self.path)
        sheetZ = xlsfile.sheet_by_name(u'幢信息')
        sheetC = xlsfile.sheet_by_name(u'层信息')
        sheetH = xlsfile.sheet_by_name(u'户信息')

        #
        rown = sheetZ.nrows
        coln = sheetZ.ncols
        cellsz = []

        for c in range(0, coln):
            cellsz.append(sheetZ.cell(1, c).value)
        objz = ObjZhuang(cellsz[0], cellsz[1])
        dictz = {str(int(objz.ID)): objz}

        #
        rown = sheetC.nrows
        coln = sheetC.ncols
        dictc = {}
        for r in range(1, rown):
            cellsc = []
            if (sheetC.cell(r, 0).value == ''):
                break
            for c in range(0, coln):
                cellsc.append(sheetC.cell(r, c).value)
            objc = ObjCeng(cellsc[0], cellsc[1])
            dictc.update({str(int(objc.ZID)) + "-" + str(int(objc.ID)): objc})

        #
        rown = sheetH.nrows
        coln = sheetH.ncols
        dicth = {}
        for r in range(1, rown):
            cellsh = []
            if (sheetH.cell(r, 0).value == ''):
                break
            for c in range(0, coln):
                cellsh.append(sheetH.cell(r, c).value)
            objh = ObjHu(cellsh[0], cellsh[1], cellsh[2], cellsh[3], cellsh[4], cellsh[5], cellsh[6])
            dicth.update(
                {str(int(objh.ZID)) + "-" + str(int(objh.CID)) + "-" + str(int(objh.ID)): objh})  # .encode('gb18030')

        # merge
        dict.update(dictz)
        dict.update(dictc)
        dict.update(dicth)

        return dict


class DealJsontemp:
    def __init__(self, path, filename):
        self.path = path
        self.filename = filename

    def extract_shape_list(self, dict):
        f = open(self.path, 'r', encoding="utf-8")  #
        #
        geo = json.load(f)

        #
        coords = []
        coordsgroup = []

        for feature in geo['features']:
            flg = feature['attributes']['height'] - 12.43 # 减地面海拔，如果需要悬空则删除
            height = feature['attributes']['flg']
            floor = str(self.filename)[2:3]
            temp = feature['geometry']['paths']
            for i in range(len(temp[0]) - 1):
                for j in temp[0][i]:
                    coords.append(j)
            coordobj = coord_obj(flg, height, floor, coords)
            coordsgroup.append(coordobj)
            coords = []

        dict.update({str(self.filename): coordsgroup})


def file_path(file_dir):
    L = []
    for root, dirs, files in os.walk(file_dir):
        for file in files:
            L.append(os.path.join(root, file))
    return L


de = DealExcel(u".\\src\\模板文件\\建筑属性.xlsx")
dictAttr = de.extract_attr_info()

file_dir = u".\\src\\分户"
dictshplist = {}
# filepaths = file_path(file_dir)

# for filep in filepaths:
for root, dirs, files in os.walk(file_dir):
    for file in files:
        dd = DealJsontemp(os.path.join(root, file), os.path.splitext(file)[0])
        dd.extract_shape_list(dictshplist)

dictgroupz = []
for key in sorted(dictshplist.keys()):
    num = str(key).count("-")
    if (num == 1):
        dictgroupz = dictgroupz + dictshplist[key]
if(dictgroupz != []):
    dictshplist.update({str(key)[0:1]: dictgroupz})
dictgroup = []

for key in sorted(dictshplist.keys()):
    num = str(key).count("-")
    if num == 0:
        type = 'Z'
        lpe = LPEntity(type, dictAttr[key], dictshplist[key])
        # zcs = dictAttr[key].Zcs
        # lpe = []
        # for i in (1, zcs + 1):
        #     lpetemp = LPEntity(type, dictAttr[key], dictshplist[key + "-" + str(i)])
        #     lpe.append(lpetemp)
    elif num == 1:
        type = 'C'
        lpe = LPEntity(type, dictAttr[key], dictshplist[key])
    elif num == 2:
        type = 'H'
        lpe = LPEntity(type, dictAttr[key], dictshplist[key])
    else:
        type = 'H'
        if str(key).find("QT") == -1:
            lpe = LPEntity(type, dictAttr[key], dictshplist[key])
        else:
            lpe = LPEntity(type, None, dictshplist[key])
    dictgroup.append(lpe)

with open(u".\\src\\模板文件\\template.json", 'r', encoding="utf-8") as load_f:
    load_dict = json.load(load_f)

load_dict['entitylist'] = dictgroup  # json_str

with open(u".\\src\\out\\out.json", "w", encoding="utf-8") as dump_f:
    ##E:\\00grad\\Data\\try.json
    json.dump(load_dict, dump_f, default=LPEntity.to_serializable, ensure_ascii = False)
