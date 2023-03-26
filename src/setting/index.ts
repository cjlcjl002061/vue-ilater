import packageInfo from "../../package.json";

export const primaryColors = [

    "#409eff",
    "#18a058",
    // "#F5222D",
    // "#722ED1",
    // "#f7acbc",
    "#0096c7",
    "#1b4412",
    "#e79bbc",
    // "#bd6758",
    // "#f47920",
    // "#2e3a1f",
    // "#b2d235",
    // "#121a2a",
    // "#6a6da9",
    // "#867892",
    // "#fcaf17",
    // "#76becc",
    // "#1b315e",
    "#b4532a",
    // "#008792",
];

const projectNameEN = "SIO-15189";
const version = packageInfo.version;
const projectNameCN = "SIO-15189管理系统";
const defaultSetting = JSON.parse(localStorage.getItem("sys_setting") || "{}");
// defaultSetting.projectName="Customs System (Test)";
export default Object.assign(
    {
        projectNameEN,
        projectNameCN,
        version,
        primaryColor: "#409eff",
        layoutMode: "ltr",
        theme: "light",
        sideWidth: 280,
        themeColor:"#ffffff",
        themeItem:{}
    },
    defaultSetting
) as Setting;
