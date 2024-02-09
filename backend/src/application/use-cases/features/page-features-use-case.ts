import { Injectable } from '@nestjs/common';

import { Feature } from '@domain/entities/feature';

import { FeatureRepository } from '@infra/database/repositories/feature.repository';
import { PageFeatures } from '@infra/database/repositories/feature.repository';
import { PaginatedType } from '@infra/http/rest/common/dto/models/paginated';

type PageFeaturesResponse = PaginatedType<Feature>;

@Injectable()
export class PageFeaturesUseCase {
  constructor(private featureRepository: FeatureRepository) {}

  async handle({
    filter = {},
    limit,
    offset,
  }: PageFeatures): Promise<PageFeaturesResponse> {
    const features = await this.featureRepository.pageFeatures({
      filter,
      limit,
      offset,
    });

    const totalCount = await this.featureRepository.countFeatures(filter);

    return {
      nodes: features,
      totalCount,
    };
  }
}
