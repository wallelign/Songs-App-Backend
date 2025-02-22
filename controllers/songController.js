import Song from "../models/Song.js";
import _ from "lodash";

//  Create a song
export const createSong = async (req, res) => {
  try {
    const allowedFields = ["title", "artist", "album", "genre"];
    const songData = _.pick(req.body, allowedFields);

    const song = new Song(songData);
    await song.save();
    res.status(201).json({
      success: true,
      message: "Song created successfully",
      song,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  Get all songs
export const getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json({
      success: true,
      count: songs.length,
      songs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Get song by ID
export const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) return res.status(404).json({ error: "Song not found" });

    res.status(200).json({
      success: true,
      song,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Update a song
export const updateSong = async (req, res) => {
  try {
    const allowedUpdates = _.pick(req.body, [
      "title",
      "artist",
      "album",
      "genre",
    ]);

    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      allowedUpdates,
      {
        new: true,
      }
    );

    if (!updatedSong) return res.status(404).json({ error: "Song not found" });

    res.status(200).json({
      success: true,
      message: "Song updated successfully",
      updatedSong,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a song
export const deleteSong = async (req, res) => {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.id);
    if (!deletedSong) return res.status(404).json({ error: "Song not found" });
    res.status(200).json({ message: "Song deleted successfully", deletedSong });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Get Song Statistics
export const getStats = async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments();
    const totalArtists = await Song.distinct("artist").then((a) => a.length);
    const totalAlbums = await Song.distinct("album").then((a) => a.length);
    const totalGenres = await Song.distinct("genre").then((g) => g.length);

    const songsPerGenre = await Song.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } },
    ]);

    const artistStats = await Song.aggregate([
      {
        $group: {
          _id: "$artist",
          songs: { $sum: 1 },
          albums: { $addToSet: "$album" },
        },
      },
      { $project: { artist: "$_id", songs: 1, albums: { $size: "$albums" } } },
    ]);

    const albumStats = await Song.aggregate([
      { $group: { _id: "$album", songs: { $sum: 1 } } },
    ]);

    res.status(200).json({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      songsPerGenre,
      artistStats,
      albumStats,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
