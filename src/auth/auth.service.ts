import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {


findAllPermissionsOfUser(userId: number){
    return [{id:1, action:"hello", subject:"User", role:null}]
}

}
