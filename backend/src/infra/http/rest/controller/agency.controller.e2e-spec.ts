import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';

import { AgencyFactory } from '@test/factories/agency.factory';

import { AgencyViewModel } from '../view-models/agency.view-model';

describe('Estate Type Controller (e2e)', () => {
  let app: INestApplication;

  let agencyFactory: AgencyFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule, HttpModule],
      providers: [AgencyFactory],
    })
      .overridePipe(ValidationPipe)
      .useValue(new ValidationPipe({ transform: true }))
      .compile();

    app = moduleRef.createNestApplication();

    agencyFactory = moduleRef.get(AgencyFactory);

    await app.init();
  });

  it('(GET) AgencyPager', async () => {
    const agency = await agencyFactory.makeAgency();

    const params = {
      offset: '0',
      limit: '10',
      name: agency.name,
      description: agency.description,
    };

    const stringParams = new URLSearchParams(params).toString();

    const response = await request(app.getHttpServer())
      .get(`/agencies?${stringParams}`)
      .send()
      .expect(200);

    const responseAgency = {
      ...AgencyViewModel.toResponse(agency),
      createdAt: agency.createdAt.toISOString(),
    };

    expect(response.body.nodes).toEqual(
      expect.arrayContaining([responseAgency]),
    );
  });
});
