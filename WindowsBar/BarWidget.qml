import QtQuick 2.15
import QtQuick.Layouts 1.15
import Quickshell
import qs.Commons
import qs.Widgets

Item {
    id: root

    property var pluginApi: null
    property string widgetId: ""
    property string section: ""
    property ShellScreen screen

    property real temperature: 0
    property int humidity: 0

    readonly property real capsuleHeight:
        Style.getCapsuleHeightForScreen(screen?.name ?? "")

    implicitHeight: capsuleHeight
    implicitWidth: content.implicitWidth + Style.marginM * 2


    function fetchTemp() {
        let xhr = new XMLHttpRequest()

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {

                if (xhr.status === 200) {
                    let data = JSON.parse(xhr.responseText)

                    root.temperature = data.temperature
                    root.humidity = data.humidity

                } else {
                    console.log("Error fetching temp:", xhr.status)
                }
            }
        }

        xhr.open("GET", "http://192.168.3.211:4002/temp")
        xhr.send()
    }


    Component.onCompleted: {
        fetchTemp()
    }


    Timer {
        interval: 30000
        running: true
        repeat: true
        onTriggered: root.fetchTemp()
    }


RowLayout {
    id: content

    anchors.centerIn: parent
    spacing: Style.marginS


    Image {
        id: temperatureIcon

        source: {
            if (root.temperature < 15)
                return "assets/termometer_low.svg"
            else if (root.temperature < 28)
                return "assets/termometer_med.svg"
            else
                return "assets/termometer_full.svg"
        }

        width: 20
        height: 20

        fillMode: Image.PreserveAspectFit
    }


    NText {
        text: root.temperature.toFixed(1) + "°C"
        Layout.alignment: Qt.AlignVCenter
    }


    Image {
        source: "assets/droplet.svg"

        width: 20
        height: 20

        fillMode: Image.PreserveAspectFit
    }


    NText {
        text: root.humidity + "%"
        Layout.alignment: Qt.AlignVCenter
    }
}


    MouseArea {
        id: mouseArea

        anchors.fill: parent

        hoverEnabled: false
        cursorShape: Qt.PointingHandCursor

        onClicked: {
            if (pluginApi)
                pluginApi.openPanel(root.screen, this)
        }
    }
}
