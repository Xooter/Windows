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

    readonly property real capsuleHeight: Style.getCapsuleHeightForScreen(screen?.name ?? "")

    implicitHeight: capsuleHeight
    implicitWidth: content.implicitWidth + Style.marginM * 2

    Rectangle {
        anchors.centerIn: parent
        height: capsuleHeight
        width: root.implicitWidth
        radius: Style.radiusL
        color: Color.mSurfaceVariant

        RowLayout {
            id: content
            anchors.centerIn: parent
            spacing: Style.marginM
            anchors.verticalCenter: parent.verticalCenter
Image {
    id: windowIcon
    source: "assets/window.svg"
    width: 24
    height: 24
    fillMode: Image.PreserveAspectFit
}
            NText {
                text: Math.round(pluginApi.mainInstance.curtain) + "%"
                Layout.alignment: Qt.AlignVCenter
            }
        }
    }

    MouseArea {
        id: mouseArea
        anchors.fill: parent
        hoverEnabled: false
        cursorShape: Qt.PointingHandCursor
        onClicked: {
            if (pluginApi)
                pluginApi.openPanel(root.screen, this);
        }
    }
}
