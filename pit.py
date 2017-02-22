import json
import requests
import pymongo 
import bson

client = pymongo.MongoClient()

db = client.newYork
#subway = db.subway
#dataSubway = requests.get("https://data.cityofnewyork.us/resource/he7q-3hwy.json").json()
#resSubway = subway.insert_many(dataSubway)


park = db.park
#dataPark = requests.get("https://data.cityofnewyork.us/resource/y6ja-fw4f.json").json()
#resPark = park.insert_many(dataPark)

school = db.school
#dataSchool = requests.get("https://data.cityofnewyork.us/resource/8pnn-kkif.json").json()
#resSchool = school.insert_many(dataSchool)



db.school.find().forEach(bson.Code('''
	function(p) {
		print(p.name)
		}'''))


#print(park.find())


#def getParkLePlusProche(longit, latit)
	
#	return 30;


#fonction -> 
#	param position school
#	renvoie le park le plus proche de school
