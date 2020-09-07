import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});
export type GradeParamType = {
    grade: number
    card_id: string
}
export const learnApi = {
    grade(gradeParam: GradeParamType) {
        return instance
            .put(`cards/grade`, {
                ...gradeParam
            })
            .then(res => {
                return res.data;
            })
    }
}