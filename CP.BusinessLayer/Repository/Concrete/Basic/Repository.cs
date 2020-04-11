﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using CP.BusinessLayer.Repository.Abstract.Basic;
using CP.Helper.Tools;

namespace CP.BusinessLayer.Repository.Concrete.Basic
{
    public class Repository<T> : IRepository<T> where T : class, new()
    {
        protected DbContext _context;
        private DbSet<T> _dbset;
        public Repository(DbContext context)
        {
            _context = context;
            _dbset = _context.Set<T>();
        }
        public void Add(T entity) => _dbset.Add(entity);

        public void AddRange(IEnumerable<T> entities)
        {
            _dbset.AddRange(entities);
        }

        public List<T> GetAll() => _dbset.ToList();

        public T GetByFilter(Expression<Func<T, bool>> expression = null)
        {
            return _dbset.FirstOrDefault(expression);
        }

        public T GetById(int id) => _dbset.Find(id);

        public List<T> GetFilterAll(Expression<Func<T, bool>> expression = null)
        {
            return _dbset.Where(expression).ToList();
        }

        public void Remove(int id)
        {
            var _entity = GetById(id);
            if (_entity.GetType().GetProperty("Status") != null)
            {
                _context.Entry(_entity).Property("Status").CurrentValue = false;
            }
            else
            {
                _dbset.Remove(_entity);
            }
        }

        public void Remove(T entity)
        {
            if (entity.GetType().GetProperty("Status") != null)
            {
                _context.Entry(entity).Property("Status").CurrentValue = false;
            }
            else
            {
                _dbset.Remove(entity);
            }
        }

        public void RemoveRange(IEnumerable<T> entities)
        {
            _dbset.RemoveRange(entities);
        }

        public List<T> SqlQuery(string query)
        {
            return _context.Database.SqlQuery<T>(query).ToList();
        }

        public void Update(T entity)
        {
            var _id = typeof(T).GetProperty("Id").GetValue(entity).ObjectIntConvert();
            _context.Entry(GetById(_id)).CurrentValues.SetValues(entity);
        }

        //For Sql Sequence 
        public int SqlFilterQuery(string query)
        {
            return _context.Database.SqlQuery<int>(query).Single();
        }

        public bool IsThere(Expression<Func<T, bool>> expression = null)
        {
            return _dbset.Any(expression);
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _dbset.ToListAsync();
        }

        public async Task<List<T>> GetFilterAllAsync(Expression<Func<T, bool>> expression)
        {
            return await _dbset.Where(expression).ToListAsync();
        }
    }
}