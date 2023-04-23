import React from "react";
import toast from "react-hot-toast";
import swal from 'sweetalert';
import { FcInfo } from 'react-icons/fc'
class Alert {
  public success = (message?: string) => {
    toast.success(message ?? 'success', {
      position: 'top-right',
      duration: 5000,
      style: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 15,
        top: 0
      }
    });
  }
  public error = (message?: string) => {
    toast.error(message ?? 'error occured', {
      position: 'top-right',
      duration: 5000,
      style: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 15,
        top: 0
      }
    });
  }
  public custom = (jsx: any) => {
    toast.custom(jsx, {
      position: 'top-right',
      duration: 5000,
      className: 'bg-black text-black p-5',
      style: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 15,
        top: 0
      }
    });
  }

  public promise = (myPromise: () => Promise<any>, loading?: string, success?: string, error?: string) => {
    const promise = myPromise();
    toast.promise(promise, {
      loading: loading ?? 'Loading',
      success: success ?? 'Got the data',
      error: error ?? 'Error when fetching',
    }).then((text) => {
      this.success(text)
    });
  }

  public prompt = (callback: () => void, message?: string) => {

    swal({
      title: message ?? "Are you sure you want to delete",
      buttons: {
        text: { text: 'no', className: 'bg-gray-500 p-0  m-0 ', value: 'no' },
        mode: { text: 'yes', className: 'bg-red-500', value: 'yes' }
      },
      dangerMode: true,
    })
      .then((value) => {
        if (value === 'yes') {
          callback()
        }
      });

  }

  public info(message?: string) {
    toast.success(message ?? 'information', {
      icon: <FcInfo size={25} />, position: 'top-right', duration: 5000,
      style: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 15,
        top: 0
      }
    })
  }

}

const notification = new Alert();

export { notification };
