import QtMultimedia
import QtQuick
import QtQuick.Layouts
import QtQuick.Controls 2.15
import qs.Commons
import qs.Widgets
import "components"

Item {
    id: root

    property var pluginApi: null
    readonly property var geometryPlaceholder: root
    readonly property bool allowAttach: true

    property real contentPreferredWidth: 400 * Style.uiScaleRatio
    property real contentPreferredHeight: 150 * Style.uiScaleRatio

    property bool sending: false

    anchors.fill: parent

    function sendCurtain() {
        sending = true;
        pluginApi.mainInstance.post(pluginApi.mainInstance.server_address, {
            curtain: pluginApi.mainInstance.curtain / 100,
            blind: 0
        }, function () {
            sending = false;
        }, function () {
            sending = false;
        });
    }

    ColumnLayout {
        anchors {
            fill: parent
            topMargin: Style.marginL
            bottomMargin: Style.marginL
            leftMargin: Style.marginL
            rightMargin: Style.marginL
        }
        spacing: Style.marginXL

        ColumnLayout {
            Layout.fillWidth: true
            Layout.alignment: Qt.AlignHCenter
            spacing: Style.marginL

            RowLayout {
                Layout.fillWidth: true

                NLabel {
                    label: "Cortina"
                    Layout.alignment: Qt.AlignVCenter
                }

                Item {
                    Layout.fillWidth: true

                    NLabel {
                        anchors.right: parent.right
                        anchors.verticalCenter: parent.verticalCenter
                        label: Math.round(pluginApi.mainInstance.curtain) + "%"
                    }
                }
            }

            NSlider {
                Layout.fillWidth: true
                from: 0
                to: 100
                stepSize: 25
                value: pluginApi.mainInstance.curtain
                onValueChanged: pluginApi.mainInstance.curtain = value
            }
        }

        SendButton {
            Layout.alignment: Qt.AlignHCenter
            text: "Enviar"
            loading: sending
            onClicked: sendCurtain()
        }
    }
}
