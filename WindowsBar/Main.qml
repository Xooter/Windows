import QtQuick
import QtQuick.Controls

Item {
    id: root
    property var pluginApi: null

    property real curtain: 0
    property real blind: 0

    readonly property string server_address: "http://192.168.3.211:4002"

    Component.onCompleted: {
        getStatus();
    }

    function getStatus() {
        get(root.server_address, function (res) {
            curtain = res.curtain * 100;
            blind = res.blind * 100;
        }, function (err, msg) {
            console.log("GET ERROR:", err, msg);
        });
    }

    function post(url, data, onSuccess, onError) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    onSuccess(JSON.parse(xhr.responseText));
                } else {
                    onError(xhr.status, xhr.responseText);
                }
            }
        };

        xhr.send(JSON.stringify(data));
    }

    function get(url, onSuccess, onError) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    onSuccess(JSON.parse(xhr.responseText));
                } else {
                    onError(xhr.status, xhr.responseText);
                }
            }
        };

        xhr.send();
    }

    Timer {
        interval: 120000
        onTriggered: {
            getStatus();
        }
    }
}
