using Oktatas.DB;
using Oktatas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Oktatas.Controllers
{
    public class ManufacturerController:ApiController
    {

        [HttpGet]
        public IHttpActionResult GetManufacturers()
        {
            try
            {
                using (HomePracticeEntities context = new HomePracticeEntities())
                {
                    List<ManufacturerVM> result = new List<ManufacturerVM>();
                    result = context.Manufacturers.Select(manufacturer => new ManufacturerVM()
                    {
                        Id = manufacturer.Id,
                        ManufacturerName = manufacturer.Manufacurer,
                        ColourCode = manufacturer.ManufacturerColourCode
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
        public IHttpActionResult GetManufacturerByID(int id)
        {
            try
            {
                using (HomePracticeEntities context = new HomePracticeEntities())
                {

                    ManufacturerVM result = new ManufacturerVM();

                    result = (from manufacturer in context.Manufacturers
                            
                              where (manufacturer.Id==id)
                              select (new ManufacturerVM()
                              {

                                   Id = manufacturer.Id,
                                   ManufacturerName =manufacturer.Manufacurer,
                                   ColourCode=manufacturer.ManufacturerColourCode,
                               

                              })).SingleOrDefault();
                               return Ok(result);
                }

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult SaveManufacturer([FromBody] ManufacturerVM manufacturerVM)
        {
            try
            {
                using (HomePracticeEntities context = new HomePracticeEntities())
                {
                    bool newItem = false;

                    Manufacturers dbManufacture = context.Manufacturers.Where(p => p.Id == manufacturerVM.Id).SingleOrDefault();
                    if (dbManufacture == null)
                    {
                        newItem = true;
                        dbManufacture = new Manufacturers();

                    }

                    dbManufacture.Manufacurer = manufacturerVM.ManufacturerName;
                    dbManufacture.ManufacturerColourCode = manufacturerVM.ColourCode;



                    if (newItem)
                    {
                        context.Manufacturers.Add(dbManufacture);

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

        [HttpPost]
        public IHttpActionResult DeleteManufacturer([FromUri] int id)
        {
            try
            {
                using (HomePracticeEntities context = new HomePracticeEntities())
                {
                    Manufacturers dbManufacturers = context.Manufacturers.Where(m => m.Id == id).SingleOrDefault();
                    if (dbManufacturers != null)
                    {
                        context.Manufacturers.Remove(dbManufacturers);
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

    }
}