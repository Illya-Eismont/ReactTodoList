using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using TodoList.Models;

namespace TodoList.Controllers
{
    public class HomeController : Controller
    {
        DataBase db = new DataBase();

        [HttpPost]
        public async Task<IActionResult> GetTodoList()
        {
            string id = "";
            if (!Request.Cookies.ContainsKey("id"))
            {
                id = ObjectId.GenerateNewId().ToString();
                Response.Cookies.Append("id", id);
                await db.AddUser(new User(id));
            }
            else
            {
                id = Request.Cookies["id"];
            }
            User user = await db.GetUser(id);
            return new JsonResult(user.TodoItems);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] string text)
        {

            User user = await db.GetUser(Request.Cookies["id"]);
            user.TodoItems.Push(text);

            user = await db.UpdateUser(user);

            return new JsonResult(user.TodoItems);
        }

        [HttpPost]
        public async Task<IActionResult> RemoveItem([FromBody] string id)
        {
            User user = await db.GetUser(Request.Cookies["id"]);
            user.TodoItems.Delete(id);

            user = await db.UpdateUser(user);

            return new JsonResult(user.TodoItems);
        }
        
        [HttpPost]
        public async Task<IActionResult> EditItem([FromBody] TodoItemModel todoItem)
        {
            User user = await db.GetUser(Request.Cookies["id"]);
            user.TodoItems.Edit(todoItem.Id, todoItem.Text, todoItem.IsDone);

            user = await db.UpdateUser(user);

            return new JsonResult(user.TodoItems);
        }

       
    }

}
