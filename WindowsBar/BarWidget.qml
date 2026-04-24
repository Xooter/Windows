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

        border.color: root._minStat < 20 ? "#E24B4A" : "transparent"
        border.width: root._minStat < 20 ? 1 : 0

        SequentialAnimation on border.width {
            running: root._minStat < 20
            loops: Animation.Infinite
            NumberAnimation {
                to: 2
                duration: 500
            }
            NumberAnimation {
                to: 0
                duration: 500
            }
        }

        RowLayout {
            id: content
            anchors.centerIn: parent
            spacing: Style.marginM
            anchors.verticalCenter: parent.verticalCenter

            NText {
                text: "asdasd"
                Layout.alignment: Qt.AlignVCenter
            }

        }
    }

    MouseArea {
        id: mouseArea
        anchors.fill: parent
        hoverEnabled: false
        cursorShape:  Qt.PointingHandCursor
        onClicked: {
            if (pluginApi)
                pluginApi.openPanel(root.screen, this)
        }
    }
}

