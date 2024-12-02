import { NextRequest, NextResponse } from "next/server"
/**
 * @param {NextRequest} request
 */
export const GET = (request) => {
    
    return NextResponse.json("HOLA");
}