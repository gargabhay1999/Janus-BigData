from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from api.HelloApiHandler import HelloApiHandler
from api.GetRoutesRiskScore import GetRoutesRiskScore

import os
import pyspark
conf = pyspark.SparkConf()

# conf.set('spark.ui.proxyBase', '/user/' + os.environ['JUPYTERHUB_USER'] + '/proxy/4041')
conf.set('spark.sql.repl.eagerEval.enabled', True) # enabled for debuggig 
conf.set('spark.driver.memory','12g')
sc = pyspark.SparkContext(conf=conf)
spark = pyspark.SQLContext.getOrCreate(sc)

app = Flask(__name__, static_url_path='', static_folder='../frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

api.add_resource(GetRoutesRiskScore, '/get-routes-risk-score', resource_class_args=[spark], endpoint='get_routes_risk_score')
api.add_resource(GetRoutesRiskScore, '/get-safest-route', resource_class_args=[spark], endpoint='get_safest_route')
api.add_resource(HelloApiHandler, '/flask/hello')