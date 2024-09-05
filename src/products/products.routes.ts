import express, {Request, Response} from "express"
import {Product, unitProduct} from "/product.interface"
import * as database from "/product.database"
import {StatusCodes} from "http-status-codes"
