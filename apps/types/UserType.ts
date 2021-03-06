//User登録時のpost内容
export type PostValueType = {
  name: string,
  email: string,
  password: string,
  password_confirmation: string
}

//Login時のpost内容
export type LoginValueType = {
  email: string,
  password: string
}

//PostとLoginの成功時の型を共通で作成
type UserSuccessType = {
  user: {
    id: number,
    name: string,
    email: string,
    password_digest: string,
    created_at: string,
    updated_at: string
  },
  token: string
}

//Postの失敗時の型を設定
export type UserPostErrorType = {
  errors: {
    name?: string[],
    email?: string[],
    password?: string[],
    password_confirmation?: string[]
  }
}
//Loginの失敗時の型を設定
type UserLoginErrorType = {
  error: "Invalid username or password"
}
//Post時のSuccessとErrorのunion型を作成する
export type UserPostType = UserSuccessType | UserPostErrorType
//Login時のSuccessとErrorのunion型を作成する
export type UserLoginType = UserSuccessType | UserLoginErrorType
