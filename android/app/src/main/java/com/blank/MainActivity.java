package com.blank;

import com.imagepicker.permissions.OnImagePickerPermissionsCallback;
import com.reactnativenavigation.NavigationActivity;
import com.facebook.react.modules.core.PermissionListener;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends NavigationActivity implements OnImagePickerPermissionsCallback {
    private PermissionListener listener;

    @Override
    public void setPermissionListener(PermissionListener listener) {
        this.listener = listener;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        if (listener != null) {
            listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
}

// public class MainActivity extends NavigationActivity {
// @Override
// protected ReactActivityDelegate createReactActivityDelegate() {
// return new ReactActivityDelegate(this, getMainComponentName()) {

// @Override
// protected ReactRootView createRootView() {
// return new RNGestureHandlerEnabledRootView(MainActivity.this);
// }
// };
// }
// }
