import { NextResponse, NextRequest } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop()
  console.log("id: ", id)
  const res = await fetch(`${DATA_SOURCE_URL}/${id}`, { method: "DELETE" });

  const response = await res.json();

  return NextResponse.json(response);
}
