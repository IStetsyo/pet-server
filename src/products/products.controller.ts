import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateProductDto } from './dto/update-product.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dto/product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private products: ProductsService) {}

  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 200, type: ProductDto })
  @Post('/create')
  @UseGuards(AuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  createProduct(
    @Body() input: CreateProductDto,
    @UploadedFiles() files: any[],
  ) {
    return this.products.createProduct(input, files);
  }

  @ApiOperation({ summary: 'Get user products' })
  @ApiResponse({ status: 200, type: [ProductDto] })
  @Get()
  @UseGuards(AuthGuard)
  findProductsByUser(@Query('userId') userId: string) {
    return this.products.findProductsByUser(+userId);
  }

  @ApiOperation({ summary: 'Get unique product' })
  @ApiResponse({ status: 200, type: ProductDto })
  @Get('/:id')
  @UseGuards(AuthGuard)
  findUniqueProduct(@Param('id') id: string) {
    return this.products.findUniqueProduct(+id);
  }

  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({ status: 200, type: ProductDto })
  @Patch('/:id')
  @UseGuards(AuthGuard)
  updateProduct(@Param('id') id: string, @Body() input: UpdateProductDto) {
    return this.products.updateProduct(+id, input);
  }

  @ApiOperation({ summary: 'Change product images' })
  @ApiResponse({ status: 200, type: ProductDto })
  @Patch('/:id/images')
  @UseGuards(AuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  updateProductImages(
    @Param('id') id: string,
    @UploadedFiles() images: { buffer: Buffer | ArrayBuffer }[],
  ) {
    return this.products.updateProductImages(+id, images);
  }
}
