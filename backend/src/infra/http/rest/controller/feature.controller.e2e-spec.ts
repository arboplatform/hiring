import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';

import { FeatureFactory } from '@test/factories/feature.factory';

import { FeatureViewModel } from '../view-models/feature.view-model';

describe('Estate Type Controller (e2e)', () => {
  let app: INestApplication;

  let featureFactory: FeatureFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule, HttpModule],
      providers: [FeatureFactory],
    })
      .overridePipe(ValidationPipe)
      .useValue(new ValidationPipe({ transform: true }))
      .compile();

    app = moduleRef.createNestApplication();

    featureFactory = moduleRef.get(FeatureFactory);

    await app.init();
  });

  it('(GET) FeaturePager', async () => {
    const feature = await featureFactory.makeFeature();

    const params = {
      offset: '0',
      limit: '10',
      name: feature.name,
      active: feature.active.toString(),

      singular: feature.singular,
      plural: feature.plural,
      unit: feature.unit,

      categoryId: feature.categoryId,
    };

    const stringParams = new URLSearchParams(params).toString();

    const response = await request(app.getHttpServer())
      .get(`/features?${stringParams}`)
      .send()
      .expect(200);

    const responseFeature = {
      ...FeatureViewModel.toResponse(feature),
      createdAt: feature.createdAt.toISOString(),
    };

    expect(response.body.nodes).toEqual(
      expect.arrayContaining([responseFeature]),
    );
  });
});
