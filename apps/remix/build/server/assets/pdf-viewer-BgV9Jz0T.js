import { Trans, useLingui } from '@lingui/react';
import pMap from 'p-map';
import * as pdfjsLib from 'pdfjs-dist';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import {
  c as cn,
  b as PDF_VIEWER_PAGE_CLASSNAME,
  a as PdfViewerErrorState,
  P as PdfViewerLoadingState,
  S as Spinner,
  u as useToast,
} from './server-build-Cc4Fq8d1.js';
import 'node:stream';
import 'zod';
import '@lingui/core';
import 'ts-pattern';
import '@react-router/node';
import 'isbot';
import 'react-dom/server';
import 'react-router';
import '@prisma/client';
import '@prisma/extension-read-replicas';
import 'kysely';
import 'prisma-extension-kysely';
import '@oslojs/crypto/sha2';
import '@oslojs/encoding';
import 'mailchecker';
import 'hono/cookie';
import 'hono/client';
import 'superjson';
import '@trpc/client';
import '@tanstack/react-query';
import '@trpc/react-query';
import '@vvo/tzdb';
import 'luxon';
import '@node-rs/bcrypt';
import 'crypto';
import 'node:module';
import 'node:path';
import '@bull-board/api';
import '@bull-board/api/bullMQAdapter';
import '@bull-board/hono';
import '@hono/node-server/serve-static';
import '@noble/hashes/sha2';
import 'bullmq';
import 'hono';
import 'ioredis';
import 'inngest';
import 'inngest/hono';
import 'cron-parser';
import '@noble/ciphers/chacha';
import '@noble/ciphers/utils';
import '@noble/ciphers/webcrypto';
import 'nanoid';
import 'pino';
import '@trpc/server';
import '@radix-ui/react-toast';
import 'class-variance-authority';
import 'lucide-react';
import 'clsx';
import 'tailwind-merge';
import '@radix-ui/react-tooltip';
import 'nuqs/adapters/react-router/v7';
import 'remix-themes';
import '@radix-ui/react-slot';
import 'framer-motion';
import 'cmdk';
import '@radix-ui/react-dialog';
import 'react-hotkeys-hook';
import '@radix-ui/react-avatar';
import '@radix-ui/react-dropdown-menu';
import 'node:fs/promises';
import '@radix-ui/react-checkbox';
import 'react-hook-form';
import '@radix-ui/react-label';
import '@radix-ui/react-select';
import '@hookform/resolvers/zod';
import '@tanstack/react-table';
import '@scure/base';
import '@radix-ui/react-popover';
import '@radix-ui/react-accordion';
import 'ua-parser-js';
import '@radix-ui/react-alert-dialog';
import '@radix-ui/react-radio-group';
import '@radix-ui/react-progress';
import '@radix-ui/react-switch';
import 'react-colorful';
import 'recharts';
import '@radix-ui/react-hover-card';
import '@radix-ui/react-scroll-area';
import 'react-icons/fa6';
import '@radix-ui/react-tabs';
import 'prop-types';
import 'file-selector';
import 'attr-accept';
import 'papaparse';
import 'zod-form-data';
import 'react-call';
import 'perfect-freehand';
import 'input-otp';
import 'react-dom';
import 'uqr';
import '@simplewebauthn/browser';
import 'remeda';
import 'colord';
import 'konva';
import '@radix-ui/react-separator';
import '@hello-pangea/dnd';
import 'react-rnd';
import 'nuqs';
import '@azure/storage-blob';
import '@sindresorhus/slugify';
import '@aws-sdk/client-s3';
import '@libpdf/core';
import '@noble/hashes/legacy';
import '@simplewebauthn/server';
import '@simplewebauthn/server/helpers';
import 'oslo/otp';
import 'hono/utils/cookie';
import 'hono/context-storage';
import '@marsidev/react-turnstile';
import 'react-icons/fc';
import 'sharp';
import 'satori';
import 'node:fs';
import 'stripe';
import 'jose';
const pdfjsWorker = '/published-apps/17/160/assets/pdf.worker-9aISQa3R.mjs';
const useVirtualList = (options) => {
  const { scrollRef, constraintRef, contentRef, itemCount, itemSize, overscan = 3 } = options;
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [constraintWidth, setConstraintWidth] = useState(0);
  const contentOffsetRef = useRef(0);
  useEffect(() => {
    const el = constraintRef?.current;
    if (!el) {
      return;
    }
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setConstraintWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    setConstraintWidth(el.getBoundingClientRect().width);
    return () => observer.disconnect();
  }, [constraintRef]);
  useEffect(() => {
    if (scrollRef === 'window') {
      const handleResize = () => {
        setViewportHeight(window.innerHeight);
      };
      window.addEventListener('resize', handleResize);
      setViewportHeight(window.innerHeight);
      return () => window.removeEventListener('resize', handleResize);
    }
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setViewportHeight(entry.contentRect.height);
      }
    });
    observer.observe(el);
    setViewportHeight(el.getBoundingClientRect().height);
    return () => observer.disconnect();
  }, [scrollRef]);
  useEffect(() => {
    if (scrollRef === 'window') {
      const calculateOffset2 = () => {
        const contentEl = contentRef?.current;
        if (!contentEl) {
          contentOffsetRef.current = 0;
          return;
        }
        contentOffsetRef.current = contentEl.getBoundingClientRect().top + window.scrollY;
      };
      const handleScroll2 = () => {
        calculateOffset2();
        const adjustedScrollTop3 = Math.max(0, window.scrollY - contentOffsetRef.current);
        setScrollTop(adjustedScrollTop3);
      };
      window.addEventListener('scroll', handleScroll2, {
        passive: true,
      });
      calculateOffset2();
      const adjustedScrollTop2 = Math.max(0, window.scrollY - contentOffsetRef.current);
      setScrollTop(adjustedScrollTop2);
      return () => window.removeEventListener('scroll', handleScroll2);
    }
    const scrollEl = scrollRef.current;
    if (!scrollEl) {
      return;
    }
    const calculateOffset = () => {
      const contentEl = contentRef?.current;
      if (!contentEl) {
        contentOffsetRef.current = 0;
        return;
      }
      const scrollRect = scrollEl.getBoundingClientRect();
      const contentRect = contentEl.getBoundingClientRect();
      contentOffsetRef.current = contentRect.top - scrollRect.top + scrollEl.scrollTop;
    };
    const handleScroll = () => {
      calculateOffset();
      const adjustedScrollTop2 = Math.max(0, scrollEl.scrollTop - contentOffsetRef.current);
      setScrollTop(adjustedScrollTop2);
    };
    scrollEl.addEventListener('scroll', handleScroll, {
      passive: true,
    });
    calculateOffset();
    const adjustedScrollTop = Math.max(0, scrollEl.scrollTop - contentOffsetRef.current);
    setScrollTop(adjustedScrollTop);
    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, [scrollRef, contentRef]);
  const getItemSize = useCallback(
    (index) => {
      if (typeof itemSize === 'function') {
        return itemSize(index, constraintWidth);
      }
      return itemSize;
    },
    [itemSize, constraintWidth],
  );
  const { offsets, totalSize } = useMemo(() => {
    const result = [];
    let offset = 0;
    for (let i = 0; i < itemCount; i++) {
      result.push(offset);
      offset += getItemSize(i);
    }
    return {
      offsets: result,
      totalSize: offset,
    };
  }, [itemCount, getItemSize]);
  const findStartIndex = useCallback(
    (scrollTop2) => {
      let low = 0;
      let high = itemCount - 1;
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const offset = offsets[mid];
        if (offset < scrollTop2) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
      return Math.max(0, low - 1);
    },
    [offsets, itemCount],
  );
  const virtualItems = useMemo(() => {
    if (itemCount === 0 || constraintWidth === 0) {
      return [];
    }
    const startIndex = findStartIndex(scrollTop);
    const items = [];
    const overscanStart = Math.max(0, startIndex - overscan);
    for (let i = overscanStart; i < itemCount; i++) {
      const start = offsets[i];
      const size = getItemSize(i);
      if (start > scrollTop + viewportHeight) {
        const overscanEnd = Math.min(itemCount, i + overscan);
        for (let j = i; j < overscanEnd; j++) {
          items.push({
            index: j,
            start: offsets[j],
            size: getItemSize(j),
            key: `virtual-item-${j}`,
          });
        }
        break;
      }
      items.push({
        index: i,
        start,
        size,
        key: `virtual-item-${i}`,
      });
    }
    return items;
  }, [itemCount, constraintWidth, scrollTop, viewportHeight, overscan, offsets, getItemSize, findStartIndex]);
  const scrollToItem = useCallback(
    (index) => {
      if (index < 0 || index >= itemCount) {
        return;
      }
      const itemOffset = offsets[index] ?? 0;
      if (scrollRef === 'window') {
        const contentEl = contentRef?.current;
        const contentTop = contentEl ? contentEl.getBoundingClientRect().top + window.scrollY : 0;
        window.scrollTo({
          top: contentTop + itemOffset,
          behavior: 'smooth',
        });
      } else {
        const scrollEl = scrollRef.current;
        if (!scrollEl) {
          return;
        }
        const contentEl = contentRef?.current;
        let contentOffset = 0;
        if (contentEl) {
          const scrollRect = scrollEl.getBoundingClientRect();
          const contentRect = contentEl.getBoundingClientRect();
          contentOffset = contentRect.top - scrollRect.top + scrollEl.scrollTop;
        }
        scrollEl.scrollTo({
          top: contentOffset + itemOffset,
          behavior: 'smooth',
        });
      }
    },
    [scrollRef, contentRef, offsets, itemCount],
  );
  return {
    virtualItems,
    totalSize,
    constraintWidth,
    scrollToItem,
  };
};
const PdfViewerPageImage = ({ imageLoadingState, imageProps }) => {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [
      imageLoadingState === 'loading' &&
        /* @__PURE__ */ jsx('div', {
          className: 'absolute inset-0 z-10 flex items-center justify-center text-muted-foreground opacity-20',
          children: /* @__PURE__ */ jsx(Spinner, {}),
        }),
      imageLoadingState === 'error' &&
        /* @__PURE__ */ jsx('div', {
          className: 'absolute inset-0 z-10 flex items-center justify-center',
          children: /* @__PURE__ */ jsx('p', {
            children: /* @__PURE__ */ jsx(Trans, {
              .../*i18n*/
              {
                id: 'PRRaD1',
              },
            }),
          }),
        }),
      imageProps.src &&
        /* @__PURE__ */ jsx('img', {
          ...imageProps,
          className: cn(imageProps.className, 'select-none'),
          draggable: false,
          alt: '',
        }),
    ],
  });
};
const useScrollToPage = (contentRef, scrollToItem) => {
  useEffect(() => {
    const el = contentRef.current;
    if (!el) {
      return;
    }
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-scroll-to-page') {
          const raw = el.getAttribute('data-scroll-to-page');
          if (raw) {
            const pageNumber = parseInt(raw, 10);
            if (!isNaN(pageNumber) && pageNumber >= 1) {
              scrollToItem(pageNumber - 1);
            }
            el.removeAttribute('data-scroll-to-page');
          }
        }
      }
    });
    observer.observe(el, {
      attributes: true,
      attributeFilter: ['data-scroll-to-page'],
    });
    return () => observer.disconnect();
  }, [contentRef, scrollToItem]);
};
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
const LOW_RENDER_RESOLUTION = 1;
const HIGH_RENDER_RESOLUTION = 2;
const IDLE_RENDER_DELAY = 200;
function PDFViewer({ className, data, scrollParentRef, onDocumentLoad, customPageRenderer, ...props }) {
  const { _: _t } = useLingui();
  const { toast } = useToast();
  const $el = useRef(null);
  const [loadingState, setLoadingState] = useState('loading');
  const pdfRef = useRef(null);
  const [pages, setPages] = useState([]);
  useEffect(() => {
    if (!data) {
      return;
    }
    let isCancelled = false;
    const fetchMetadata = async () => {
      try {
        setLoadingState('loading');
        setPages([]);
        if (isCancelled) {
          return;
        }
        let result = typeof data === 'string' ? null : new Uint8Array(data);
        if (typeof data === 'string') {
          const response = await fetch(data);
          if (!response.ok) {
            throw new Error(`Failed to fetch PDF data: ${response.status}`);
          }
          result = new Uint8Array(await response.arrayBuffer());
        }
        if (isCancelled) {
          return;
        }
        const loadedPdf = await pdfjsLib.getDocument({
          data: result,
          cMapUrl: '/static/cmaps/',
        }).promise;
        if (isCancelled) {
          await loadedPdf.destroy();
          return;
        }
        if (pdfRef.current) {
          await pdfRef.current.destroy();
        }
        pdfRef.current = loadedPdf;
        const pages2 = await pMap(
          Array.from({
            length: loadedPdf.numPages,
          }),
          async (_, pageIndex) => {
            const page = await loadedPdf.getPage(pageIndex + 1);
            const viewport = page.getViewport({
              scale: 1,
            });
            return {
              width: viewport.width,
              height: viewport.height,
            };
          },
        );
        if (isCancelled) {
          return;
        }
        setPages(pages2);
        setLoadingState('loaded');
      } catch (err) {
        if (isCancelled) {
          return;
        }
        console.error(err);
        setLoadingState('error');
        toast({
          title: _t(
            /*i18n*/
            {
              id: 'SlfejT',
            },
          ),
          description: _t(
            /*i18n*/
            {
              id: 'Gt8/3x',
            },
          ),
          variant: 'destructive',
        });
      }
    };
    void fetchMetadata();
    return () => {
      isCancelled = true;
      if (pdfRef.current) {
        void pdfRef.current.destroy();
        pdfRef.current = null;
      }
    };
  }, [data]);
  useEffect(() => {
    if (loadingState === 'loaded' && onDocumentLoad) {
      onDocumentLoad();
    }
  }, [loadingState, onDocumentLoad]);
  const isLoading = loadingState === 'loading';
  const hasError = loadingState === 'error';
  if (!data) {
    return /* @__PURE__ */ jsx('div', {
      ref: $el,
      className: cn('h-full w-full', className),
      ...props,
      children: /* @__PURE__ */ jsx('p', {
        className: 'py-32 text-center text-muted-foreground text-sm',
        children: /* @__PURE__ */ jsx(Trans, {
          .../*i18n*/
          {
            id: 'i1ibmE',
          },
        }),
      }),
    });
  }
  return /* @__PURE__ */ jsxs('div', {
    ref: $el,
    className: cn('h-full w-full', className),
    ...props,
    children: [
      isLoading && /* @__PURE__ */ jsx(PdfViewerLoadingState, {}),
      hasError && /* @__PURE__ */ jsx(PdfViewerErrorState, {}),
      loadingState === 'loaded' &&
        pages.length > 0 &&
        pdfRef.current &&
        /* @__PURE__ */ jsx(VirtualizedPageList, {
          scrollParentRef,
          constraintRef: $el,
          numPages: pages.length,
          pages,
          pdf: pdfRef.current,
          customPageRenderer,
        }),
    ],
  });
}
const VirtualizedPageList = ({ scrollParentRef, constraintRef, pages, numPages, pdf, customPageRenderer }) => {
  const contentRef = useRef(null);
  const { virtualItems, totalSize, constraintWidth, scrollToItem } = useVirtualList({
    scrollRef: scrollParentRef,
    constraintRef,
    contentRef,
    itemCount: numPages,
    itemSize: (index, width) => {
      const pageMeta = pages[index];
      const aspectRatio = pageMeta.height / pageMeta.width;
      const scaledHeight = width * aspectRatio;
      return scaledHeight + 32 + 2;
    },
    overscan: 5,
  });
  useScrollToPage(contentRef, scrollToItem);
  return /* @__PURE__ */ jsx('div', {
    ref: contentRef,
    'data-pdf-content': '',
    'data-page-count': numPages,
    style: {
      height: `${totalSize}px`,
      width: '100%',
      position: 'relative',
    },
    children: virtualItems.map((virtualItem) => {
      const index = virtualItem.index;
      const pageMeta = pages[index];
      const pageNumber = index + 1;
      const scale = constraintWidth / pageMeta.width;
      const scaledWidth = Math.floor(pageMeta.width * scale);
      const scaledHeight = Math.floor(pageMeta.height * scale);
      return /* @__PURE__ */ jsxs(
        'div',
        {
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: constraintWidth,
            height: `${virtualItem.size}px`,
            transform: `translateY(${virtualItem.start}px)`,
          },
          children: [
            /* @__PURE__ */ jsx(PdfViewerPage, {
              unscaledWidth: pageMeta.width,
              unscaledHeight: pageMeta.height,
              scaledWidth,
              scaledHeight,
              pageNumber,
              pdf,
              scale,
              customPageRenderer,
            }),
            /* @__PURE__ */ jsx('p', {
              className: 'my-2 text-center text-[11px] text-muted-foreground/80',
              children: /* @__PURE__ */ jsx(Trans, {
                .../*i18n*/
                {
                  id: 'wQQdcH',
                  values: {
                    pageNumber,
                    numPages,
                  },
                },
              }),
            }),
          ],
        },
        virtualItem.key,
      );
    }),
  });
};
const PdfViewerPage = ({
  pageNumber,
  pdf,
  unscaledWidth,
  unscaledHeight,
  scaledWidth,
  scaledHeight,
  scale,
  customPageRenderer: CustomPageRenderer,
}) => {
  const { imageProps, imageLoadingState } = usePdfPageImage({
    pageNumber,
    pdf,
    scaledWidth,
    scaledHeight,
    scale,
  });
  return /* @__PURE__ */ jsxs('div', {
    className: 'relative w-full rounded border border-border',
    style: {
      width: scaledWidth,
      height: scaledHeight,
    },
    children: [
      CustomPageRenderer &&
        imageLoadingState === 'loaded' &&
        /* @__PURE__ */ jsx(CustomPageRenderer, {
          pageData: {
            scale,
            pageIndex: pageNumber - 1,
            pageNumber,
            pageWidth: unscaledWidth,
            pageHeight: unscaledHeight,
            imageLoadingState,
          },
        }),
      /* @__PURE__ */ jsx(PdfViewerPageImage, { imageLoadingState, imageProps }),
    ],
  });
};
const usePdfPageImage = ({ pageNumber, pdf, scale, scaledWidth, scaledHeight }) => {
  const [imageLoadingState, setImageLoadingState] = useState('loading');
  const [imageUrl, setImageUrl] = useState('');
  const renderTaskRef = useRef(null);
  const idleTimerRef = useRef(null);
  const renderedResolutionRef = useRef(null);
  const renderedPageNumberRef = useRef(null);
  const renderedPdfRef = useRef(null);
  useEffect(() => {
    let isCancelled = false;
    const cancelRenderTask = () => {
      if (!renderTaskRef.current) {
        return;
      }
      renderTaskRef.current.cancel();
      renderTaskRef.current = null;
    };
    const hasMatchingRenderedImage = (resolution) => {
      return (
        renderedPdfRef.current === pdf &&
        renderedPageNumberRef.current === pageNumber &&
        renderedResolutionRef.current === resolution
      );
    };
    const setRenderedImageMeta = (resolution) => {
      renderedPdfRef.current = pdf;
      renderedPageNumberRef.current = pageNumber;
      renderedResolutionRef.current = resolution;
    };
    const renderAtResolution = async (resolution) => {
      let currentTask = null;
      try {
        if (isCancelled) {
          return;
        }
        if (hasMatchingRenderedImage(resolution)) {
          return;
        }
        cancelRenderTask();
        const page = await pdf.getPage(pageNumber);
        if (isCancelled) {
          return;
        }
        const renderScale = scale * resolution;
        const viewport = page.getViewport({
          scale: renderScale,
        });
        const canvas = document.createElement('canvas');
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        const context = canvas.getContext('2d');
        if (!context) {
          throw new Error('Failed to get canvas context');
        }
        currentTask = page.render({
          canvasContext: context,
          viewport,
          canvas,
        });
        renderTaskRef.current = currentTask;
        await currentTask.promise;
        if (isCancelled || renderTaskRef.current !== currentTask) {
          return;
        }
        setRenderedImageMeta(resolution);
        setImageUrl(canvas.toDataURL('image/jpeg'));
      } catch (err) {
        if (err instanceof Error && err.name === 'RenderingCancelledException') {
          return;
        }
        if (!isCancelled) {
          console.error(err);
          setImageLoadingState('error');
        }
      } finally {
        if (renderTaskRef.current === currentTask) {
          renderTaskRef.current = null;
        }
      }
    };
    void renderAtResolution(LOW_RENDER_RESOLUTION);
    idleTimerRef.current = setTimeout(() => {
      void renderAtResolution(HIGH_RENDER_RESOLUTION);
    }, IDLE_RENDER_DELAY);
    return () => {
      isCancelled = true;
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
      cancelRenderTask();
    };
  }, [pdf, pageNumber, scale]);
  const imageProps = useMemo(
    () => ({
      className: PDF_VIEWER_PAGE_CLASSNAME,
      width: Math.floor(scaledWidth),
      height: Math.floor(scaledHeight),
      alt: '',
      onLoad: () => setImageLoadingState('loaded'),
      onError: () => setImageLoadingState('error'),
      src: imageUrl,
      'data-page-number': pageNumber,
      draggable: false,
    }),
    [scaledWidth, scaledHeight, imageUrl, pageNumber],
  );
  return {
    imageProps,
    imageLoadingState,
  };
};

export { PDFViewer as default };
