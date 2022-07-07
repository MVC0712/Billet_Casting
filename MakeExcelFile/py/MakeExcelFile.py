#!C:\python\python3.9\python.exe
# -*- coding: utf-8 -*-
import cgitb
import cgi
import os
import json
import sys
import io
import urllib.parse
import openpyxl

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

cgitb.enable()

data = sys.stdin.read()
params = json.loads(data)

print('Content-type: text/html\nAccess-Control-Allow-Origin: *\n')
print("\n\n")
print(json.JSONEncoder().encode(response))
print('\n')

wb = openpyxl.load_workbook('ExcelFile.xlsx')
sheet = wb.get_sheet_by_name('input')

sheet['c1'] = params["product_type"]
sheet['c2'] = params["product_dim"]
sheet['c3'] = params["code"]
sheet['c4'] = params["product_date"]
sheet['c5'] = params["extrusion_scrap"]
sheet['c6'] = params["casting_scrap"]
sheet['c7'] = params["aluminium_ingot"]
sheet['c8'] = params["aluminium_orther"]
sheet['c9'] = params["si"]
sheet['c10'] = params["mg"]
sheet['c11'] = params["mn"]
sheet['c12'] = params["cr"]
sheet['c13'] = params["cu"]
sheet['c14'] = params["fe"]
sheet['c15'] = params["zn"]
sheet['c16'] = params["ti_b"]

wb.save("../../FileDownLoad/ExcelFile/" +
        params["product_date"] + "_" +
        params["product_type"] + "_" +
        params["code"] + ".xlsx")
