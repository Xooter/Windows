import QtMultimedia
import QtQuick
import QtQuick.Layouts
import qs.Commons
import QtQuick.Controls 2.15
import qs.Commons
import qs.Widgets

Item {
    id: root

    property var pluginApi: null
    property real contentPreferredWidth: 400 * Style.uiScaleRatio
    property real contentPreferredHeight: 430 * Style.uiScaleRatio
    readonly property var geometryPlaceholder: root
    readonly property bool allowAttach: true

    anchors.fill: parent

    property bool sending: false

    ColumnLayout {
        anchors.fill: parent
        anchors.margins: Style.marginXS
        spacing: Style.marginXL

        NSlider {
            Layout.fillWidth: true
            from: 0
            to: 100
            stepSize: 25
            value: pluginApi.mainInstance.curtain
            onValueChanged: pluginApi.mainInstance.curtain = value
        }

        NButton {
            id: button

            text: sending ? "Enviando..." : "Enviar"
            enabled: !sending

            implicitWidth: 200
            implicitHeight: 48

            onClicked: {
                root.sending = true;

                pluginApi.mainInstance.post(pluginApi.mainInstance.SERVER_ADDRESS, {
                    curtain: pluginApi.mainInstance.curtain / 100,
                    blind: 0 // TODO: completar blind
                }, function (res) {
                    root.sending = false;
                }, function (err, msg) {
                    root.sending = false;
                });
            }
        }
    }
}
