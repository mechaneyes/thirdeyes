"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@auth0/nextjs-auth0/client";
import prisma from "@/lib/prisma";

import Header from "@/app/components/Header";

type FormValues = {
  title: string;
  url: string;
  category: string;
  description: string;
  image: FileList;
};

const CreateLinkMutation = gql`
  mutation createLink(
    $title: String!
    $url: String!
    $imageUrl: String!
    $category: String!
    $description: String!
  ) {
    createLink(
      title: $title
      url: $url
      imageUrl: $imageUrl
      category: $category
      description: $description
    ) {
      title
      url
      imageUrl
      category
      description
    }
  }
`;

const Admin = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user, redirect to the login page
    if (!isLoading && !user) {
      router.push("/api/auth/login");
    }
  }, [user, isLoading, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [createLink, { loading, error }] = useMutation(CreateLinkMutation, {
    onCompleted: () => reset(),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { title, url, category, description } = data;
    const imageUrl = `https://via.placeholder.com/300`;
    const variables = { title, url, category, description, imageUrl };
    try {
      toast.promise(createLink({ variables }), {
        loading: "Creating new link..",
        success: "Link successfully created!🎉",
        error: `Something went wrong 😥 Please try again -  ${error}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="thirdeyes">
      <Header />
      <div className="container mx-auto max-w-md py-12">
        <Toaster />
        <h2 className="text-3xl font-small text-center my-5">Create a new link</h2>
        <form
          className="grid grid-cols-1 gap-y-6 shadow-xl p-8 border-2 border-gray-800 rounded-lg bg-inherit"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="block">
            <span className="text-gray-400">Title</span>
            <input
              placeholder=" Title"
              {...register("title", { required: true })}
              name="title"
              type="text"
              className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-400">Description</span>
            <input
              placeholder=" Description"
              {...register("description", { required: true })}
              name="description"
              type="text"
              className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-400">Url</span>
            <input
              placeholder=" https://your.url"
              {...register("url", { required: true })}
              name="url"
              type="text"
              className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-400">Category</span>
            <input
              placeholder=" Name"
              {...register("category", { required: true })}
              name="category"
              type="text"
              className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <button
            disabled={loading}
            type="submit"
            className="my-4 capitalize bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="w-6 h-6 animate-spin mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
                Creating...
              </span>
            ) : (
              <span>Create Link</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const session = await getSession(req, res);

//   if (!session) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/api/auth/login',
//       },
//       props: {},
//     }
//   }

//   return {
//     props: {},
//   };
// }
