//正常上传
import {post} from "@/api/http";

const upload = (url:string, data:any, headers = {}) => {
    return new Promise((resolve, reject) => {
        post({
            url,
            data,
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            return resolve(res.data)
        }).catch(err => {
            return reject(err)
        })
    })
}

//分片上传
/**
 *
 * @param url 上传的的地址
 * @param file 上传的文件
 * @param fName 上传的文件所指代的字段名
 * @param obj 上传所附带的内容
 * 上传所附带的内容尽量不要与返回的内容同名
 * @return iChunk 当前切片
 * @return totalChunk 全部切片
 * @return startLength 开始长度
 */
const uploadByPieces = async (url:string,file:any,fName:string,obj:any) => {
    // 上传过程中用到的变量
    const chunkSize = 1 * 1024 * 1024; // 1MB一片
    const chunkCount = Math.ceil(file.size / chunkSize); // 总片数
    // 获取当前chunk数据
    const getChunkInfo = (file:any, index:any) => {
        const start:any = index * chunkSize;
        const end :any= Math.min(file.size, start + chunkSize);
        const chunk:any = file.slice(start, end);
        return { start, end, chunk };
    };
    // 分片上传接口
    const uploadChunk = (data:any) => {
        return new Promise((resolve, reject) => {
            post({
                url,
                data,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                return resolve(res)
            }).catch(err => {
                return reject(err)
            })
        })
    }
    // 针对单个文件进行chunk上传(index:)
    const readChunk = (index:any) => {
        const { chunk ,start} = getChunkInfo(file, index);
        const fetchForm :any= new FormData();
        for (const objKey in obj) {
            fetchForm.append(objKey, obj[objKey]);
        }
        fetchForm.append(fName, chunk);
        // fetchForm.append("relFileName", file.name);
        fetchForm.append("iChunk", index);
        fetchForm.append("totalChunk", chunkCount);
        // fetchForm.append("uuid", file.uid);
        // fetchForm.append("fileSize", file.size);
        fetchForm.append("startLength", start);
        return uploadChunk(fetchForm)
    };
    // 针对每个文件进行chunk处理
    const promiseList = []
    try {
        for (let index = 0; index < chunkCount; ++index) {
            promiseList.push(readChunk(index))
        }
        const resList = await Promise.all(promiseList)
        resList.forEach((res:any)=>{
            if(res.code!=200){
                return res
            }
        })
        return resList[0]
    }catch (e) {
        return e
    }
}
export { upload, uploadByPieces }