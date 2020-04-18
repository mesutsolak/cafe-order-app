﻿using CP.BusinessLayer.Repository.Abstract.Basic;
using CP.Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CP.BusinessLayer.Operations
{
    public class UserOperations : BaseOperation
    {
        public async static Task<int> UserAdd(User user)
        {
            _data.UserRepository.Add(user);
            return await _data.CompleteAsync();
        }
        public async static Task<List<User>> GetUsers()
        {
            return await _data.UserRepository.GetAllAsync();
        }
        public async static Task<User> UserFindAsync(int id)
        {
            return await _data.UserRepository.GetByIdAsync(id);
        }
        public async static Task<int> UserUpdate(User user)
        {
            _data.UserRepository.Update(user);
            return await _data.CompleteAsync();
        }
        public async static Task<int> UserRemove(int id)
        {
            _data.UserRepository.Remove(id);
            return await _data.CompleteAsync();
        }
        public async static Task<string> UserControl(User user)
        {
            if (await _data.UserRepository.LoginControl(user))
            {
                return "Başarıyla Giriş Yapıldı";
            }
            else
            {
                return "Giriş Başarısız";
            }
        }
    }
}
