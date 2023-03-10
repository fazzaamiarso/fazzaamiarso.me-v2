import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import axios from "axios";

type Props = {
  slug: string;
};

type LikeResponse = {
  likes: number;
};

const translateVals = [
  "translate-y-full",
  "translate-y-[75%]",
  "translate-y-[60%]",
  "translate-y-[40%]",
  "translate-y-[20%]",
  "translate-y-[0%]",
];
const queryClient = new QueryClient();

const likePost = async (data: Props) => {
  return await (
    await axios.post("/api/like", data)
  ).data;
};

const fetchLikes = async (data: Props): Promise<LikeResponse> => {
  const savedLikes = await axios.get(`/api/like`, { params: data });
  return await savedLikes.data;
};

export const LikeButton = ({ slug }: Props) => {
  const queryKey = [`like-${slug}`];

  const { data } = useQuery({
    queryKey,
    queryFn: async () => fetchLikes({ slug }),
  });

  const likeMutation = useMutation(likePost, {
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const prevLikes = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (prev) => ({
        likes: (prev as LikeResponse).likes + 1,
      }));

      return { prevLikes } as { prevLikes: LikeResponse };
    },
    onError: (err, newLikes, context) => {
      if (context?.prevLikes) {
        queryClient.setQueryData(queryKey, context.prevLikes);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  return (
    <div>
      <button
        type='button'
        onClick={() => {
          if (!data || data?.likes >= 5) return;
          likeMutation.mutate({ slug });
        }}
        className='flex items-center gap-2'>
        <div className='group  relative overflow-hidden'>
          <div
            aria-hidden='true'
            className={clsx(
              translateVals[data?.likes ? data.likes : 0],
              "absolute -z-20 h-full w-full rounded-md bg-gradient-to-tl from-pink-400 to-pink-600 transition-all"
            )}></div>
          <div
            aria-hidden='true'
            className={"absolute bottom-0 -z-10 h-[5px] w-full bg-bg dark:bg-bgDark"}></div>
          <svg
            className='aspect-square h-8 w-8 rounded-md'
            width='507'
            height='507'
            viewBox='0 0 507 507'
            fill='black'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M507 0H0V507H507V0ZM267.177 414.131C272.247 411.276 279.459 407.106 288.091 401.711C310.288 387.876 331.462 372.467 351.448 355.604C396.855 317.029 446 260.236 446 193.353C446 132.706 396.346 88 345.359 88C305.11 88 272.651 109.477 253 142.393C233.367 109.477 200.89 88 160.641 88C109.636 88 60 132.706 60 193.335C60 260.219 109.127 316.994 154.552 355.621C180.742 377.721 208.957 397.311 238.823 414.131C241.519 415.645 244.239 417.117 246.982 418.546C248.844 419.501 250.907 420 253 420C255.093 420 257.156 419.501 259.018 418.546H259.053C261.773 417.109 264.492 415.638 267.177 414.131Z'
              className='origin-center fill-zinc-200 transition-all group-hover:scale-105 dark:fill-zinc-800'
            />
          </svg>
        </div>
        <span className='inline-block'>{data ? data.likes : 0}</span>
      </button>
    </div>
  );
};

export const LikeWrapper = (props: { slug: string }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LikeButton {...props} />
    </QueryClientProvider>
  );
};
