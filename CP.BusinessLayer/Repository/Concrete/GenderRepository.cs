﻿using CP.BusinessLayer.Repository.Abstract;
using CP.BusinessLayer.Repository.Concrete.Basic;
using CP.Entities.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CP.BusinessLayer.Repository.Concrete
{
    public class GenderRepository : Repository<Gender>, IGenderRepository
    {
        public GenderRepository(DbContext dbContext) : base(dbContext)
        {

        }
    }
}