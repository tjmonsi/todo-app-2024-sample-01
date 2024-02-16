import Fastify from 'fastify';
import { saveDB, readDB, deleteItemDB } from './db.js';
import { v4 } from 'uuid';

export async function build () {
  const fastify = Fastify({ logger: true });

  fastify.get('/', async (request, reply) => {
    return { hello: 'world' };
  });

  // LET'S CREATE A TODO HERE
  fastify.post('/todo', async (request) => {
    // gets the body and make it as a todo
    const { body: todo } = request;

    // creates an id for the todo
    todo.id = v4();

    // set the dateCreated with a numerical value in milliseconds 
    // from Jan 1, 1970 of the date this line is called
    todo.dateCreated = new Date().getTime();

    // saves the todo in "database"
    await saveDB('todo', todo);

    // returns the todo
    return { todo };
  });

  // LET'S READ ALL TODOS HERE
  fastify.get('/todo', async () => {
    // Gets the todos
    const todos = readDB('todo');
    // sorts todos array by descending order
    todos.sort((a, b) => b.dateCreated - a.dateCreated);
    // returns an object with a property todos that is an array of todos
    return { todos };
  });

  // LET'S GET ONE TODO HERE
  fastify.get('/todo/:id', async (request) => {
    const { id } = request.params;
    const todo = readDB('todo', id);
    return { todo };
  })

  // LET'S UPDATE A TODO HERE
  fastify.patch('/todo/:id', async (request) => {
    const { body, params } = request;
    const { id } = params;
    // sets default values for title, description, and done 
    // to null if they don't exist
    const { title = null, description = null, done = null } = body;
    const todo = readDB('todo', id);

    if (title) todo.title = title;
    // if a description text exists, then set the todo.description to description
    if (description) todo.description = description;
    // if done is not null, set the todo.done to done
    if (done !== null) todo.done = done;

    await saveDB('todo', todo);
    return { todo };
  })

  fastify.delete('/todo/:id', async (request) => {
    deleteItemDB('todo', request.params.id);
    return { success: true }
  })

  return fastify;
}