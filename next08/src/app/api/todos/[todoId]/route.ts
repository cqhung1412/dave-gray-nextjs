import { NextResponse, NextRequest } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";
const API_KEY: string = process.env.DATA_API_KEY as string;

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop() as string;
  const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
    headers: {
      "API-Key": API_KEY,
    },
  });

  const todo: Todo = await res.json();
  if (!todo.id)
    return NextResponse.json(
      {
        message: "Todo not found",
      },
      { status: 404 }
    );
  return NextResponse.json(todo);
}

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop() as string;
  const { title, userId, completed }: Partial<Todo> = await request.json();
  if (!id || !title || !userId || typeof completed !== "boolean")
    return NextResponse.json(
      {
        message: "Missing info",
      },
      { status: 400 }
    );

  const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "API-Key": API_KEY,
    },
    body: JSON.stringify({
      title,
      userId,
      completed,
    }),
  });

  const updatedTodo = (await res.json()) as Todo;

  return NextResponse.json({
    message: `Todo ${updatedTodo.id} updated`,
    todo: updatedTodo,
  });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop() as string;
  if (Number.isNaN(Number(id)))
    return NextResponse.json(
      {
        message: "Invalid ID",
      },
      { status: 400 }
    );

  const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "API-Key": API_KEY,
    },
  });

  return NextResponse.json({ message: `Todo ${id} deleted`, code: res.status });
}
