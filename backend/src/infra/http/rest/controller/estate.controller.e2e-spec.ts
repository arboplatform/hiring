import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { Estate } from '@domain/entities/estate';
import { EstateFeature } from '@domain/entities/estateFeature';
import { Feature } from '@domain/entities/feature';
import { FeatureCategory } from '@domain/entities/featureCategory';

import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';

import { AgencyFactory } from '@test/factories/agency.factory';
import { EstateFactory, makeFakeEstate } from '@test/factories/estate.factory';
import {
  EstateFeatureFactory,
  makeFakeEstateFeature,
} from '@test/factories/estateFeature.factory';
import { EstateTypeFactory } from '@test/factories/estateType.factory';
import { FeatureFactory } from '@test/factories/feature.factory';
import { FeatureCategoryFactory } from '@test/factories/featureCategory.factory';

import { PriceType } from '../dto/enum/price';
import { EstateViewModel } from '../view-models/estate.view-model';

describe('Estate Controller (e2e)', () => {
  let app: INestApplication;

  let estateFactory: EstateFactory;
  let agencyFactory: AgencyFactory;
  let estateTypeFactory: EstateTypeFactory;
  let featureFactory: FeatureFactory;

  const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule, HttpModule],
      providers: [
        EstateFactory,
        AgencyFactory,
        EstateTypeFactory,
        FeatureFactory,
        EstateFeatureFactory,
        FeatureCategoryFactory,
      ],
    })
      .overridePipe(ValidationPipe)
      .useValue(new ValidationPipe({ transform: true }))
      .compile();

    app = moduleRef.createNestApplication();

    estateFactory = moduleRef.get(EstateFactory);
    agencyFactory = moduleRef.get(AgencyFactory);
    estateTypeFactory = moduleRef.get(EstateTypeFactory);
    featureFactory = moduleRef.get(FeatureFactory);

    await app.init();
  });

  it('(POST) CreateEstate', async () => {
    const agency = await agencyFactory.makeAgency();
    const estateType = await estateTypeFactory.makeEstateType();

    const features = await Promise.all<Feature>(
      [...new Array(3)].map(() => featureFactory.makeFeature()),
    );

    const estateFeatures = features.map((feature) =>
      makeFakeEstateFeature({ feature }),
    );

    const estate = makeFakeEstate({
      agency,
      type: estateType,
      features: estateFeatures,
    });

    const feturesDTO = estateFeatures.map(
      ({ amount, featureId, showAmount }) => ({
        amount,
        featureId,
        showAmount,
      }),
    );

    const response = await request(app.getHttpServer())
      .post('/estates/create')
      .send({
        name: estate.name,
        description: estate.description,
        address: estate.address,

        agencyId: estate.agencyId,
        typeId: estate.typeId,

        prices: estate.prices,
        features: feturesDTO,
      })
      .expect(201);

    const resEstate = EstateViewModel.toResponse(estate);

    const addressExpected = expect.objectContaining({
      street: resEstate.address.street,
      city: resEstate.address.city,
      state: resEstate.address.state,
      number: resEstate.address.number,
      zip: resEstate.address.zip,
    });

    const agencyExpected = expect.objectContaining({
      id: expect.stringMatching(objectIdRegex), // ObjectId
      name: expect.toBeString(),
      description: expect.toBeString(),
      createdAt: expect.toBeDateString(),
    });

    const typeExpected = expect.objectContaining({
      id: expect.stringMatching(objectIdRegex), // ObjectId
      name: expect.toBeString(),
      createdAt: expect.toBeDateString(),
    });

    const pricesExpected = expect.arrayContaining([
      expect.objectContaining({
        type: expect.toBeOneOf(Object.values(PriceType)),
        value: expect.toBePositive(),
      }),
    ]);

    const featureCategoryExpected = expect.objectContaining({
      id: expect.stringMatching(objectIdRegex), // ObjectId
      name: expect.toBeString(),
      createdAt: expect.toBeDateString(),
    });

    const featuresExpected = expect.objectContaining({
      id: expect.stringMatching(objectIdRegex), // ObjectId
      name: expect.toBeString(),
      active: expect.toBeBoolean(),

      singular: expect.toBeString(),
      plural: expect.toBeString(),

      category: featureCategoryExpected,
      createdAt: expect.toBeDateString(),
    });

    const estateFeaturesExpected = expect.arrayContaining([
      expect.objectContaining({
        id: expect.stringMatching(objectIdRegex), // ObjectId
        amount: expect.toBePositive(),
        showAmount: expect.toBeBoolean(),

        feature: featuresExpected,
      }),
    ]);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.stringMatching(objectIdRegex), // ObjectId
        name: resEstate.name,
        description: resEstate.description,

        active: expect.toBeBoolean(),
        address: addressExpected,

        agency: agencyExpected,
        type: typeExpected,

        prices: pricesExpected,
        features: estateFeaturesExpected,

        createdAt: expect.toBeDateString(),
      }),
    );
  });

  it('(PUT) EditEstate', async () => {
    const name = 'New Title';
    const description = 'New Description';
    const active = false;

    const address = {
      street: 'New Street',
      city: 'New City',
      state: 'New State',
      number: 123,
      zip: 'New Zip',
    };

    const prices = [
      { type: PriceType.SALE, value: 123456 },
      { type: PriceType.RENT, value: 1234 },
    ];

    const features = await Promise.all<Feature>(
      [...new Array(3)].map(() => featureFactory.makeFeature()),
    );

    const estateFeatures = features.map((feature) =>
      makeFakeEstateFeature({ feature }),
    );

    const featuresDTO = estateFeatures.map(
      ({ amount, featureId, showAmount }) => ({
        amount,
        featureId,
        showAmount,
      }),
    );

    const agency = await agencyFactory.makeAgency();
    const estateType = await estateTypeFactory.makeEstateType();

    const estate = await estateFactory.makeEstate();

    const response = await request(app.getHttpServer())
      .put(`/estates/edit/${estate.id}`)
      .send({
        name,
        description,
        active,
        address,

        agencyId: agency.id,
        typeId: estateType.id,

        prices,
        features: featuresDTO,
      })
      .expect(200);

    const featureCategoryExpected = ({ name }: FeatureCategory) =>
      expect.objectContaining({
        id: expect.stringMatching(objectIdRegex), // ObjectId
        name,
        createdAt: expect.toBeDateString(),
      });

    const featuresExpected = ({
      name,
      active,
      singular,
      plural,
      unit,
      category,
    }: Feature) =>
      expect.objectContaining({
        id: expect.stringMatching(objectIdRegex), // ObjectId
        name,
        active,

        singular,
        plural,
        unit,

        category: featureCategoryExpected(category),
        createdAt: expect.toBeDateString(),
      });

    const estateFeatureExpected = ({
      amount,
      showAmount,
      feature,
    }: EstateFeature) =>
      expect.objectContaining({
        id: expect.stringMatching(objectIdRegex), // ObjectId
        amount,
        showAmount,

        feature: featuresExpected(feature),
      });

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.stringMatching(objectIdRegex), // ObjectId
        name,
        description,
        active,

        address: expect.objectContaining(address),
        prices: expect.arrayContaining(
          prices.map((price) => expect.objectContaining(price)),
        ),

        agency: expect.objectContaining({
          name: agency.name,
          description: agency.description,
          createdAt: expect.any(String),
        }),
        type: expect.objectContaining({
          name: estateType.name,
          createdAt: expect.any(String),
        }),

        features: expect.arrayContaining(
          estateFeatures.map(estateFeatureExpected),
        ),

        createdAt: expect.any(String),
      }),
    );
  });

  it('(DELETE) RemoveEstate', async () => {
    const estate = await estateFactory.makeEstate();

    const response = await request(app.getHttpServer())
      .delete(`/estates/remove/${estate.id}`)
      .send()
      .expect(200);

    const params = new URLSearchParams({ slug: estate.slug }).toString();

    const queryResponse = await request(app.getHttpServer())
      .get(`/estates?${params}`)
      .send()
      .expect(200);

    const estatesFixed = new Estate(
      {
        ...estate.props,
        features: estate.features.map((estateFeature): EstateFeature => {
          return new EstateFeature(
            { ...estateFeature.props, estateId: estate.id },
            estateFeature.id,
          );
        }),
      },
      estate.id,
    );

    const responseEstate = {
      ...EstateViewModel.toResponse(estatesFixed),
      createdAt: estate.createdAt.toISOString(),
    };

    expect(queryResponse.body.totalCount).toBe(0);
    expect(response.body).toEqual(responseEstate);
  });

  it('(GET) EstatePager', async () => {
    const prices = [
      { type: PriceType.SALE, value: 123456 },
      { type: PriceType.RENT, value: 1234 },
    ];

    const estate = await estateFactory.makeEstate({ prices });

    const params = {
      offset: '0',
      limit: '10',

      name: estate.name,
      slug: estate.slug,
      description: estate.description,
      active: estate.active.toString(),

      agencyId: estate.agencyId,
      typeId: estate.typeId,

      'rent.min': '1000',
      'rent.max': '2000',
      'sale.min': '100000',
      'sale.max': '200000',
    };

    const stringParams = new URLSearchParams(params).toString();

    const response = await request(app.getHttpServer())
      .get(`/estates?${stringParams}`)
      .send()
      .expect(200);

    const estatesFixed = new Estate(
      {
        ...estate.props,
        features: estate.features.map((estateFeature): EstateFeature => {
          return new EstateFeature(
            { ...estateFeature.props, estateId: estate.id },
            estateFeature.id,
          );
        }),
      },
      estate.id,
    );

    const responseEstate = {
      ...EstateViewModel.toResponse(estatesFixed),
      createdAt: estate.createdAt.toISOString(),
    };

    expect(response.body.nodes).toEqual(
      expect.arrayContaining([responseEstate]),
    );
  });
});
