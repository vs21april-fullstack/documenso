import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { createFolder } from '../../../lib/server-only/folder/create-folder.js';
import { deleteFolder } from '../../../lib/server-only/folder/delete-folder.js';
import { findFolders } from '../../../lib/server-only/folder/find-folders.js';
import { findFoldersInternal } from '../../../lib/server-only/folder/find-folders-internal.js';
import { getFolderBreadcrumbs } from '../../../lib/server-only/folder/get-folder-breadcrumbs.js';
import { getFolderById } from '../../../lib/server-only/folder/get-folder-by-id.js';
import { updateFolder } from '../../../lib/server-only/folder/update-folder.js';
import { ZSuccessResponseSchema, ZGenericSuccessResponse } from '../schema.js';
import { router, authenticatedProcedure } from '../trpc.js';
import { ZDeleteFolderRequestSchema, ZUpdateFolderRequestSchema, ZUpdateFolderResponseSchema, ZCreateFolderRequestSchema, ZCreateFolderResponseSchema, ZFindFoldersInternalRequestSchema, ZFindFoldersInternalResponseSchema, ZFindFoldersRequestSchema, ZFindFoldersResponseSchema, ZGetFoldersSchema, ZGetFoldersResponseSchema } from './schema.js';

const folderRouter = router({
  /**
   * @private
   */
  getFolders: authenticatedProcedure.input(ZGetFoldersSchema).output(ZGetFoldersResponseSchema).query(async ({
    input,
    ctx
  }) => {
    const {
      teamId,
      user
    } = ctx;
    const {
      parentId,
      type
    } = input;
    ctx.logger.info({
      input: {
        parentId,
        type
      }
    });
    const folders = await findFoldersInternal({
      userId: user.id,
      teamId,
      parentId,
      type
    });
    const breadcrumbs = parentId ? await getFolderBreadcrumbs({
      userId: user.id,
      teamId,
      folderId: parentId,
      type
    }) : [];
    return {
      folders,
      breadcrumbs,
      type
    };
  }),
  /**
   * @public
   */
  findFolders: authenticatedProcedure.meta({
    openapi: {
      method: 'GET',
      path: '/folder',
      summary: 'Find folders',
      description: 'Find folders based on a search criteria',
      tags: ['Folder']
    }
  }).input(ZFindFoldersRequestSchema).output(ZFindFoldersResponseSchema).query(async ({
    input,
    ctx
  }) => {
    const {
      teamId,
      user
    } = ctx;
    const {
      parentId,
      type,
      page,
      perPage
    } = input;
    ctx.logger.info({
      input: {
        parentId,
        type
      }
    });
    return await findFolders({
      userId: user.id,
      teamId,
      parentId,
      type,
      page,
      perPage
    });
  }),
  /**
   * @private
   */
  findFoldersInternal: authenticatedProcedure.input(ZFindFoldersInternalRequestSchema).output(ZFindFoldersInternalResponseSchema).query(async ({
    input,
    ctx
  }) => {
    const {
      teamId,
      user
    } = ctx;
    const {
      parentId,
      type
    } = input;
    ctx.logger.info({
      input: {
        parentId,
        type
      }
    });
    const folders = await findFoldersInternal({
      userId: user.id,
      teamId,
      parentId,
      type
    });
    const breadcrumbs = parentId ? await getFolderBreadcrumbs({
      userId: user.id,
      teamId,
      folderId: parentId,
      type
    }) : [];
    return {
      data: folders,
      breadcrumbs,
      type
    };
  }),
  /**
   * @public
   */
  createFolder: authenticatedProcedure.meta({
    openapi: {
      method: 'POST',
      path: '/folder/create',
      summary: 'Create new folder',
      description: 'Creates a new folder in your team',
      tags: ['Folder']
    }
  }).input(ZCreateFolderRequestSchema).output(ZCreateFolderResponseSchema).mutation(async ({
    input,
    ctx
  }) => {
    const {
      teamId,
      user
    } = ctx;
    const {
      name,
      parentId,
      type
    } = input;
    ctx.logger.info({
      input: {
        parentId,
        type
      }
    });
    if (parentId) {
      try {
        await getFolderById({
          userId: user.id,
          teamId,
          folderId: parentId,
          type
        });
      } catch (error) {
        throw new AppError(AppErrorCode.NOT_FOUND, {
          message: 'Parent folder not found'
        });
      }
    }
    const result = await createFolder({
      userId: user.id,
      teamId,
      name,
      parentId,
      type
    });
    return result;
  }),
  /**
   * @public
   */
  updateFolder: authenticatedProcedure.meta({
    openapi: {
      method: 'POST',
      path: '/folder/update',
      summary: 'Update folder',
      description: 'Updates an existing folder',
      tags: ['Folder']
    }
  }).input(ZUpdateFolderRequestSchema).output(ZUpdateFolderResponseSchema).mutation(async ({
    input,
    ctx
  }) => {
    const {
      teamId,
      user
    } = ctx;
    const {
      folderId,
      data
    } = input;
    ctx.logger.info({
      input: {
        folderId
      }
    });
    const result = await updateFolder({
      userId: user.id,
      teamId,
      folderId,
      data
    });
    return {
      ...result
    };
  }),
  /**
   * @public
   */
  deleteFolder: authenticatedProcedure.meta({
    openapi: {
      method: 'POST',
      path: '/folder/delete',
      summary: 'Delete folder',
      description: 'Deletes an existing folder',
      tags: ['Folder']
    }
  }).input(ZDeleteFolderRequestSchema).output(ZSuccessResponseSchema).mutation(async ({
    input,
    ctx
  }) => {
    const {
      teamId,
      user
    } = ctx;
    const {
      folderId
    } = input;
    ctx.logger.info({
      input: {
        folderId
      }
    });
    await deleteFolder({
      userId: user.id,
      teamId,
      folderId
    });
    return ZGenericSuccessResponse;
  })
});

export { folderRouter };
//# sourceMappingURL=router.js.map
