import QtMultimedia
import QtQuick
import QtQuick.Layouts
import qs.Commons
import QtQuick.Controls 2.15
import qs.Commons
import qs.Widgets
import "components"

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
            value: root.pluginApi.mainInstance.curtain
            onValueChanged: pluginApi.mainInstance.curtain = value
        }

        SendButton {
            text: "Enviar"
            loading: sending

            onClicked: {
                sending = true;

                pluginApi.mainInstance.post(pluginApi.mainInstance.server_address, {
                    curtain: pluginApi.mainInstance.curtain / 100,
                    blind: 0
                }, function (res) {
                    sending = false;
                }, function (err, msg) {
                    sending = false;
                });
            }
        }
    }
}
