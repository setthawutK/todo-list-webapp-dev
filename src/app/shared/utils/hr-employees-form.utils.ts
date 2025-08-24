import { CreateUserReqDto } from '@shared/swagger/i-leave.ts';

export function getGenderName(gender: CreateUserReqDto.GenderEnum): string {
  switch (gender) {
    case 'MALE':
      return 'ชาย';
    case 'FEMALE':
      return 'หญิง';
    case 'ALL':
      return 'อื่นๆ';
  }
}
