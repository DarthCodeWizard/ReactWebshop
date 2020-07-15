using Oktatas.DB;
using Oktatas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Oktatas.Controllers
{
    public class CategoryController: ApiController
    {
        [HttpGet]
        public IHttpActionResult GetCategories()
        {
            try
            {
                using (HomePracticeEntities context =  new HomePracticeEntities())
                {
                    List<CategoryVM> result = new List<CategoryVM>();
                    result = context.Category.Select(category => new CategoryVM()
                    {
                        Id = category.Id,
                        Name = category.Name
                    }).ToList();

                    return Ok(result);
                }
                
            }

            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }
    }
}