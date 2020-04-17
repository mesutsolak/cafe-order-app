﻿using CP.Mobile.Tools;

using CP.Mobile.Tools.AlertModals;
using CP.Mobile.Validator;
using CP.Mobile.ValidatorEntities;
using CP.ServiceLayer.Concrete;
using CP.ServiceLayer.DTO;
using FluentValidation;
using Rg.Plugins.Popup.Extensions;
using Rg.Plugins.Popup.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using Xamarin.Plugins.UnobtrusiveFluentValidation;

namespace CP.Mobile.ContentPages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class Register : ContentPage
    {
        UserService userService = new UserService();
        UserViewModel userViewModel = new UserViewModel();
        public Register()
        {
            InitializeComponent();
            BindingContext = userViewModel;
            this.IsBusy = false;
        }

        private void btnClear_Clicked(object sender, EventArgs e)
        {
            FormClear();
        }

        private void FormClear()
        {
            FormTools.FormClear(StlForm);
        }

        private async void btnRegister_Clicked(object sender, EventArgs e)
        {
            await Navigation.PushPopupAsync(new SuccessModal("Debene"));

            //await Task.Delay(5000);

            //await PopupNavigation.Instance.PopAsync(true); ;

           //var _result = userViewModel.ModelResult();

            // if (!_result)
            // {
            //     this.IsBusy = false;
            //     await Navigation.PushPopupAsync(new ErrorModal("MMMMMMMMM"));
            // }

            //try
            //{
            //    userService.Url = "/api/User";
            //    var _result = await userService.AddAsync(new User
            //    {
            //        FirstName = EntFirstName.Text,
            //        LastName = EntLastName.Text,
            //        Username = EntUserName.Text,
            //        Email = EntEmail.Text,
            //        Password = EntPassword.Text,
            //    });
            //    if (_result.Contains("Başarıyla"))
            //    {
            //        await DisplayAlert("Başarılı", "Başarıyla Kayıt Olundu", "Kapat");
            //        FormClear();
            //    }
            //    else
            //    {
            //        await DisplayAlert("Başarısız", "İşlem Başarısız", "Kapat");
            //    }
            //}
            //catch (Exception ex)
            //{

            //    throw;
            //}

        }
    }
}