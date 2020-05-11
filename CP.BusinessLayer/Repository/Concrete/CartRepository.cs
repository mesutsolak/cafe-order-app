﻿using CP.BusinessLayer.Repository.Abstract;
using CP.BusinessLayer.Repository.Concrete.Basic;
using CP.Entities.Migrations;
using CP.Entities.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CP.BusinessLayer.Repository.Concrete
{
    public class CartRepository:Repository<Cart>,ICartRepository
    {
        public CartRepository(DbContext dbContext):base(dbContext)
        {
                
        }

        public CafeProjectModel CafeDB => _context as CafeProjectModel; //bu cast işlemine sürekli ihtiyac duyacağız.

        public void CartConfirm(int CartId)
        {
           var cart =  CafeDB.Cart.FirstOrDefault(x => x.Id == CartId);
            CafeDB.Entry(cart).Property("IsConfirm").CurrentValue = true;
        }

        public Cart CartFind(int id)
        {
           return CafeDB.Cart.Include(x => x.Product).FirstOrDefault(x => x.Id == id);
        }

        public Task<List<Cart>> CartListAsync(int UserId)
        {
           return CafeDB.Cart.Where(x => x.IsConfirm == false && x.IsDeleted == false && x.IsUse == false).ToListAsync();
        }
    }
}