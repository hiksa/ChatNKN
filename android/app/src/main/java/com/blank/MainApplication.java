package com.blank;

import android.app.Application;
//import android.support.multidex.MultiDex;
import android.util.Log;

import com.bitgo.randombytes.RandomBytesPackage;
import com.imagepicker.ImagePickerPackage;
import com.rnfs.RNFSPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.horcrux.svg.SvgPackage;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import org.reactnative.camera.RNCameraPackage;

import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import com.github.wumke.RNLocalNotifications.RNLocalNotificationsPackage;
// import com.wix.reactnativenotifications.RNNotificationsPackage;

import java.util.List;
import java.util.Arrays;

public class MainApplication extends NavigationApplication {

    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @javax.annotation.Nullable
            @Override
            protected String getJSBundleFile() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(new RandomBytesPackage(), new RNGestureHandlerPackage(),
                new RNCWebViewPackage(), new ReanimatedPackage(), new RNCameraPackage(), new SvgPackage(),
                new ImagePickerPackage(), new AsyncStoragePackage(), new RNFSPackage(),
                new RNLocalNotificationsPackage());
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}
