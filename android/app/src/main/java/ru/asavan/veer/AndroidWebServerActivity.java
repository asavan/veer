package ru.asavan.veer;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;


public class AndroidWebServerActivity extends Activity {
    private static final int STATIC_CONTENT_PORT = 8080;
    private static final int WEB_SOCKET_PORT = 8088;
    private static final String WEB_GAME_URL = "https://asavan.github.io/veer/";
    public static final String WEB_VIEW_URL = "file:///android_asset/www/index.html";
    public static final String MAIN_LOG_TAG = "VEER_TAG";
    private static final boolean secure = false;

    private BtnUtils btnUtils;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        btnUtils = new BtnUtils(this, STATIC_CONTENT_PORT, WEB_SOCKET_PORT);
        try {
            HostUtils hostUtils = new HostUtils(STATIC_CONTENT_PORT, WEB_SOCKET_PORT, secure);
            addButtons(IpUtils.getIPAddressSafe(), hostUtils);
            btnUtils.launchTwa(hostUtils.getStaticHost(IpUtils.LOCALHOST), null);
        } catch (Exception e) {
            Log.e(MAIN_LOG_TAG, "main", e);
        }
    }

    private void addButtons(String formattedIpAddress, HostUtils hostUtils) {
        final String host = hostUtils.getStaticHost(formattedIpAddress);
        btnUtils.addButtonBrowser(host, null, R.id.launch_browser);
        btnUtils.addButtonTwa(hostUtils.getStaticHost(IpUtils.LOCALHOST), null, R.id.twa_real_ip, host);
        btnUtils.addButtonTwa(WEB_GAME_URL, null, R.id.newest);
    }

    @Override
    protected void onDestroy() {
        if (btnUtils != null) {
            btnUtils.onDestroy();
        }
        super.onDestroy();
    }
}
