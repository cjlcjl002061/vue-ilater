export const baseUrl='/'
export  const  materialsBaseUrl="http://192.168.123.175:9854"
// export const baseUrl='http://10.1.51.31:9854/'
// export  const  materialsBaseUrl="http://10.1.51.31:9854"
//登录系统
export const loginUrl = baseUrl+"user/doLogin";
/**
 * 菜单管理
 */
//新增菜单
export const addMenuUrl = baseUrl+"menu/addMenu";
export const deleteMenuUrl = baseUrl+"menu/deleteMenu";
export const editMenuUrl = baseUrl+"menu/editMenuApi";
export const getMenuListUrl = baseUrl+"menu/getMenuListInfo";
export const getMenuListToTableUrl = baseUrl+"menu/getAllMenuToTable";
export const getMenuListByRoleIdUrl = baseUrl+"menu/getMenuListByRoleId";
/*上传授权菜单*/
export const upSetRoleMenu = baseUrl+"role/upSetRoleMenu"
/**
 * 用户管理
 */
//禁用用户
export const disableUserUrl=baseUrl+'user/disableUser'
export const getAllUserUrl=baseUrl+'user/getAllUser'
export const addUserInfo=baseUrl+'user/addUser'

/**
 * 角色管理
 */
//删除角色
export const deleteRoleUrl=baseUrl+'role/deleteRole'
//编辑角色
export const editRoleUrl=baseUrl+'role/editRole'
//获取角色信息
export const getAllRoleTablesUrl=baseUrl+'role/getAllRoleTables'
//通过用户id获取角色信息
export const getUserRoleByUserIdUrl=baseUrl+'role/getUserRoleByUserId'
//获取全部角色
export const getRoleAllListUrl=baseUrl+'role/getAllRoleList'
//获取全部角色
export const getALLRoleAndMenuTOListUrl=baseUrl+'role/getALLRoleAndMenuTOList'
//更新角色信息
export const uploadRoleUrl=baseUrl+'role/uploadRole'
/*查询所有授权的菜单*/
export const getAllRoleMenuIds = baseUrl+"role/getAllRoleMenuIds"
/*为用户分配角色*/
export const updateUserRoleUrl = baseUrl+"role/updateUserRole"
/**
 * 字典
 */
export const getDictionaryUrl = baseUrl+"dictionary/getDictionary"
/**
 * 条款大类
 */
export const getItemCategoryListUrl=baseUrl+"itemCategory/getItemCategoryList"
/**
 * 条款项
 */
export const importItemUrl=baseUrl+"item/importItem"
export const getItemListUrl=baseUrl+"item/getItemList"
export const getItemTreeUrl=baseUrl+"item/getItemTree"
export const updateItemUrl=baseUrl+"item/updateItem"
export const exportItemUrl=baseUrl+"item/exportItem"
/**
 * 证明材料
 */
export const uploadProveFileUrl=baseUrl+"proveFile/uploadFile"

/*
* 素材管理
* */
export const getAllMaterialsUrl=baseUrl+'material/getAllMaterials'

/**
 * 实验室管理
 */
export const getLaboratoryListUrl=baseUrl+'laboratory/getLaboratoryList'
export const addLaboratoryUrl=baseUrl+'laboratory/addLaboratory'
export const updateLaboratoryUrl=baseUrl+'laboratory/updateLaboratory'
export const deleteLaboratoryUrl=baseUrl+'laboratory/deleteLaboratory'
/**
 * 年度自查
 */
export const getCheckManageListUrl=baseUrl+'checkManage/getList'
export const addManageItemUrl=baseUrl+'checkManage/add'
export const editManageItemUrl=baseUrl+'checkManage/update'
/**
 * 某年自查
 */
export const getCheckMaintainListUrl=baseUrl+'checkMaintain/getList'
export const addMaintainItemUrl=baseUrl+'checkMaintain/add'
export const editMaintainItemUrl=baseUrl+'checkMaintain/update'