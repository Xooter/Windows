import QtQuick

Item {
    id: root
    property var pluginApi: null

    readonly property var cfg: pluginApi?.pluginSettings ?? ({})

    function save() {
        if (!pluginApi)
            return;
        pluginApi.saveSettings();
    }
}
