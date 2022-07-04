/* eslint-disable */

const CustomWidget = () => {
    if (typeof window !== "undefined") {
        window.onload = (event) => {
            // Register any custom widgets here
            CMS.registerWidget('uuid', uuidWidget.UuidControl, uuidWidget.UuidPreview)
        };   
    }
    return (<></>);
}

export default CustomWidget
