import QtMultimedia
import QtQuick
import QtQuick.Layouts
import qs.Commons

Item {
    id: root

    property var pluginApi: null
    property real contentPreferredWidth: 400 * Style.uiScaleRatio
    property real contentPreferredHeight: 430 * Style.uiScaleRatio
    readonly property var geometryPlaceholder: root
    readonly property bool allowAttach: true

    anchors.fill: parent

    ColumnLayout {
        anchors.fill: parent
        anchors.margins: Style.marginXS
        spacing: Style.marginXL
    }
}
