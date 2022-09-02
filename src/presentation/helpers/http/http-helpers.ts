import { HttpResponse } from '../../protocols/http'

export const serverSuccess = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
})

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error
})

export const notFound = (error: Error): HttpResponse => ({
    statusCode: 404,
    body: error
})
