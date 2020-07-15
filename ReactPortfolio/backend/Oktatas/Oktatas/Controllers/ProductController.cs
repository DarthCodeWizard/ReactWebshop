using Microsoft.Ajax.Utilities;
using Oktatas.DB;
using Oktatas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Oktatas.Controllers
{
    public class ProductController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetProducts()
        {
            try
            {
                List<ProductVM> result = new List<ProductVM>();
                using (HomePracticeEntities context = new HomePracticeEntities())
                {
                    result = (from product in context.Product
                              join category in context.Category on product.CategoryId equals category.Id
                              join manufactuerer in context.Manufacturers on product.ManufacturerId equals manufactuerer.Id

                              select new ProductVM()
                              {

                                  ID = product.Id,
                                  CategoryID = category.Id,
                                  CategoryName = category.Name,
                                  Price = product.Price,
                                  Currency = product.Currency,
                                  Count = product.Count,
                                  Description = product.Description,
                                  Image = product.Image,
                                  Name = product.Name,
                                  VisitCount = product.visitCount ?? 0,
                                  ManufactureId = manufactuerer.Id,
                                  ManufacturerName = manufactuerer.Manufacurer,
                                  Color = manufactuerer.ManufacturerColourCode

                              }
                             ).ToList();

                    return Ok(result);
                }
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetProductByID(int id)
        {
            try
            {
                using (HomePracticeEntities context = new HomePracticeEntities())
                {
                    ProductVM result = new ProductVM();



                    result = (from product in context.Product
                              join manufactuerer in context.Manufacturers on product.ManufacturerId equals manufactuerer.Id
                              where (product.Id == id && product.ManufacturerId == manufactuerer.Id)
                              select (new ProductVM()
                              {
                                  ID = product.Id,
                                  CategoryID = product.CategoryId,
                                  Price = product.Price,
                                  Currency = product.Currency,
                                  Count = product.Count,
                                  Description = product.Description,
                                  Image = product.Image,
                                  Name = product.Name,
                                  VisitCount = product.visitCount ?? 0,
                                  ManufactureId = product.ManufacturerId,
                                  ManufacturerName = manufactuerer.Manufacurer,
                                  Color = manufactuerer.ManufacturerColourCode,



                              })).SingleOrDefault();
                    return Ok(result);
                }

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetProductByCategoryId(int categoryId)
        {
            try
            {
                using (HomePracticeEntities context = new HomePracticeEntities())
                {
                    List<ProductVM> result = new List<ProductVM>();
                    result = (from product in context.Product
                              join category in context.Category on product.CategoryId equals category.Id
                              join manufactuerer in context.Manufacturers on product.ManufacturerId equals manufactuerer.Id
                              where(product.CategoryId==categoryId)
                              select new ProductVM()
                              {
                                  Name = product.Name,
                                  ID = product.Id,
                                  CategoryID = category.Id,
                                  Price = product.Price,
                                  Currency = product.Currency,
                                  Count = product.Count,
                                  Description = product.Description,
                                  Image = product.Image,
                                  CategoryName = category.Name,
                                  VisitCount = product.visitCount ?? 0,
                                  ManufacturerName =manufactuerer.Manufacurer,
                                  Color=manufactuerer.ManufacturerColourCode,

                              }).ToList();

                    return Ok(result);
                }
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }
    
        [HttpGet]
        public IHttpActionResult GetTopProducts()
        {
            try
            {
                List<ProductVM> result = new List<ProductVM>();
                using (HomePracticeEntities context = new HomePracticeEntities())
                {
                    result = (from product in context.Product
                              join category in context.Category on product.CategoryId equals category.Id
                              join manufactuerer in context.Manufacturers on product.ManufacturerId equals manufactuerer.Id
                              select new ProductVM()
                              {

                                  ID = product.Id,
                                  CategoryID = product.CategoryId,
                                  CategoryName = category.Name,
                                  Price = product.Price,
                                  Currency = product.Currency,
                                  Count = product.Count,
                                  Description = product.Description,
                                  Image = product.Image,
                                  Name = product.Name,
                                  VisitCount = product.visitCount ?? 0,
                                  ManufactureId = manufactuerer.Id,
                                  ManufacturerName=manufactuerer.Manufacurer,
                                  Color = manufactuerer.ManufacturerColourCode,

                              }
                             ).OrderByDescending(p => p.VisitCount).Take(3).ToList();

                    return Ok(result);
                }
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult DeleteProduct([FromUri] int id)
        {
            try
            {
                using (HomePracticeEntities context = new HomePracticeEntities())
                {
                    Product dbProduct = context.Product.Where(p => p.Id == id).SingleOrDefault();
                    if (dbProduct != null)
                    {
                        context.Product.Remove(dbProduct);
                        context.SaveChanges();
                    }
                    return Ok();
                }

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult IncreaseVisitCount([FromUri] int id)
        {
            try
            {
                using (HomePracticeEntities context = new HomePracticeEntities())
                {
                    Product dbProduct = context.Product.Where(p => p.Id == id).SingleOrDefault();
                    if (dbProduct != null)
                    {
                        int visitCount = dbProduct.visitCount ?? 0;
                        dbProduct.visitCount = visitCount + 1;
                        context.SaveChanges();
                    }
                    return Ok();
                }

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult SaveProduct([FromBody] ProductVM productVM)
        {
            try
            {
                using (HomePracticeEntities context = new HomePracticeEntities())
                {
                    bool newItem = false;

                    Product dbProduct = context.Product.Where(p => p.Id == productVM.ID).SingleOrDefault();
                    if (dbProduct == null)
                    {
                        newItem = true;
                        dbProduct = new Product();

                    }

                    dbProduct.Name = productVM.Name;
                    dbProduct.CategoryId = productVM.CategoryID;
                    dbProduct.Price = productVM.Price;
                    dbProduct.Currency = productVM.Currency;
                    dbProduct.Count = productVM.Count;
                    dbProduct.Description = productVM.Description;
                    dbProduct.Image = productVM.Image;
                    dbProduct.ManufacturerId = productVM.ManufactureId;


                    if (newItem)
                    {
                        context.Product.Add(dbProduct);

                    }
                    context.SaveChanges();

                    return Ok("Siker!!!!444");
                }
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }
    }

}