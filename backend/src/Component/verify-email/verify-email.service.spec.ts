import { Test, TestingModule } from '@nestjs/testing';
import { VerificationService } from './verify-email.service';

describe('VerifyEmailService', () => {
  let service: VerificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerifyEmailService],
    }).compile();

    service = module.get<VerifyEmailService>(VerifyEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
