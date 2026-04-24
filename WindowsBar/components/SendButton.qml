import QtQuick 2.15
import QtQuick.Controls 2.15
import qs.Commons
import qs.Widgets

Item {
    id: root
    property alias text: button.text
    property bool loading: false
    property bool disabled: false

    signal clicked

    width: 200
    height: 48

    NButton {
        id: button
        anchors.fill: parent

        property real scaleFactor: 1.0

        text: root.loading ? "Enviando..." : root.text
        enabled: !root.loading && !root.disabled

        transform: Scale {
            origin.x: button.width / 2
            origin.y: button.height / 2
            xScale: button.scaleFactor
            yScale: button.scaleFactor
        }

        MouseArea {
            anchors.fill: parent

            onPressed: button.scaleFactor = 0.94
            onReleased: button.scaleFactor = 1.0
            onClicked: root.clicked()
        }

        Behavior on scaleFactor {
            NumberAnimation {
                duration: 180
                easing.type: Easing.OutBack
            }
        }

        Item {
            anchors.right: parent.right
            anchors.verticalCenter: parent.verticalCenter
            anchors.rightMargin: 12

            width: 16
            height: 16
            visible: root.loading

            RotationAnimator on rotation {
                from: 0
                to: 360
                duration: 800
                loops: Animation.Infinite
                running: root.loading
            }

            Rectangle {
                anchors.fill: parent
                radius: 8
                border.width: 2
                border.color: "white"
                color: "transparent"
            }

            Rectangle {
                width: parent.width / 2
                height: 2
                color: "white"
                anchors.centerIn: parent
            }
        }
    }
}
