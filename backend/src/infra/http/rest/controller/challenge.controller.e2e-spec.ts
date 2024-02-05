import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import mongoose from 'mongoose';
import request from 'supertest';

import { Agency } from '@domain/entities/agency';
import { EstateType } from '@domain/entities/estateType';

import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';

import { EstateFactory, makeFakeEstate } from '@test/factories/estate.factory';

import { Address } from '../dto/enum/address';
import { EstateViewModel } from '../view-models/estate.view-model';

describe('Estate Controller (e2e)', () => {
  let app: INestApplication;

  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  let estateFactory: EstateFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule, HttpModule],
      providers: [EstateFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    estateFactory = moduleRef.get<EstateFactory>(EstateFactory);

    await app.init();
  });

  it('(POST) CreateEstate', async () => {
    const estate = makeFakeEstate();

    const response = await request(app.getHttpServer())
      .post('/estates/create')
      .send({
        name: estate.name,
        description: estate.description,
        address: estate.address,
        agencyId: estate.agencyId,
        typeId: estate.typeId,
        prices: estate.prices,
        features: estate.features,
      })
      .expect(200);

    const resEstate = EstateViewModel.toResponse(estate);

    expect(response.body.data).toEqual(
      expect.objectContaining({
        id: expect.any(mongoose.Types.ObjectId),
        name: resEstate.name,
        description: resEstate.description,
        address: expect.objectContaining(Address),

        agencyId: expect.any(mongoose.Types.ObjectId),
        agency: expect.objectContaining(Agency),
        typeId: expect.any(mongoose.Types.ObjectId),
        type: expect.objectContaining(EstateType),

        prices: estate.prices,
        features: estate.features,

        createdAt: expect.any(Date),
      }),
    );
  });

  // it('(Mutation) EditEstate', async () => {
  //   const title = 'New Title';
  //   const description = 'New Description';

  //   const estate = await estateFactory.makeEstate();

  //   const response = await request(app.getHttpServer())
  //     .post('/graphql')
  //     .send({
  //       query: `
  //         mutation {
  //           editEstate(data: {
  //             id: "${estate.id}"
  //             title: "${title}"
  //             description: "${description}"
  //           }) {
  //             id
  //             title
  //             description
  //             createdAt
  //           }
  //         }
  //       `,
  //     })
  //     .expect(200);

  //   expect(response.body.data.editEstate).toEqual(
  //     expect.objectContaining({
  //       id: expect.any(String),
  //       title,
  //       description,
  //       createdAt: expect.any(String),
  //     }),
  //   );
  // });

  // it('(Mutation) RemoveEstate', async () => {
  //   const estate = await estateFactory.makeEstate();

  //   const response = await request(app.getHttpServer())
  //     .post('/graphql')
  //     .send({
  //       query: `
  //         mutation {
  //           removeEstate(data: {
  //             id: "${estate.id}"
  //           }) {
  //             id
  //             title
  //             description
  //             createdAt
  //           }
  //         }
  //       `,
  //     })
  //     .expect(200);

  //   const queryResponse = await request(app.getHttpServer())
  //     .post('/graphql')
  //     .send({
  //       query: `
  //         query {
  //           estates(filter: {
  //             title: "${estate.title}"
  //           }) {
  //             totalCount
  //           }
  //         }
  //       `,
  //     })
  //     .expect(200);

  //   const graphqlEstate = {
  //     ...EstateViewModel.toGraphql(estate),
  //     createdAt: estate.createdAt.toISOString(),
  //   };

  //   expect(response.body.data.removeEstate).toEqual(graphqlEstate);
  //   expect(queryResponse.body.data.estates.totalCount).toBe(0);
  // });

  // it('(Query) EstatePager', async () => {
  //   const estate = await estateFactory.makeEstate();

  //   const response = await request(app.getHttpServer())
  //     .post('/graphql')
  //     .send({
  //       query: `
  //         query {
  //           estates(
  //             offset: 0
  //             limit: 1
  //             filter: {
  //               title: "${estate.title}",
  //               description: "${estate.description}"
  //             }
  //           ) {
  //             nodes {
  //               id
  //               title
  //               description
  //               createdAt
  //             }
  //             totalCount
  //           }
  //         }
  //       `,
  //     })
  //     .expect(200);

  //   const graphqlEstate = {
  //     ...EstateViewModel.toGraphql(estate),
  //     createdAt: estate.createdAt.toISOString(),
  //   };

  //   expect(response.body.data.estates.nodes).toEqual(
  //     expect.arrayContaining([graphqlEstate]),
  //   );
  // });
});
